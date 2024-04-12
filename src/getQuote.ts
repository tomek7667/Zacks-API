import { parse } from "node-html-parser";

interface Options {
	extended: boolean;
}

const defaultOptions: Options = {
	extended: false,
};

interface ZrankRow {
	rank: number;
	definition: string;
	annualizedReturn: number;
}

interface Result {
	rank: number;
	definition: string;
	zrankRows?: ZrankRow[];
}

export const getQuote = async (
	symbol: string,
	options?: {
		extended: boolean;
	},
): Promise<Result> => {
	const zrankRows: ZrankRow[] = [];
	let rank: number;
	let definition: string;
	const { extended } = options || defaultOptions;
	const url = `https://www.zacks.com:443/stock/quote/${symbol}`;
	const response = await fetch(url, {
		method: "GET",
	});
	if (response.status === 302) {
		throw new Error(`Symbol ${symbol} not found: "${url}"`);
	}
	if (response.status !== 200) {
		throw new Error(`Unexpected response status: ${response.status}`);
	}
	const text = await response.text();
	const root = parse(text);
	if (extended) {
		// get tbody
		const zrankTable = root
			.getElementById("zrankTable")
			?.childNodes.find((node) => node.rawTagName === "tbody");
		if (!zrankTable) {
			throw new Error("zrankTable not found");
		}
		// only first 5 rows
		const rows = zrankTable.childNodes.filter((node) => node.rawTagName === "tr").slice(0, 5);
		rows.forEach((row) => {
			const [rankTh, definitionTd, annualizedReturnTd] = row.childNodes;
			const rank = Number(rankTh.text);
			const definition = definitionTd.text;
			const annualizedReturn = Number(annualizedReturnTd.text.split("%")[0]) / 100;
			zrankRows.push({ rank, definition, annualizedReturn });
		});
	}
	const firstRankView = root.querySelector(".rank_view");
	if (!firstRankView) {
		throw new Error("rank_view not found");
	}
	try {
		const recommendation = firstRankView.text.split(" of 5")[0].trim();
		const [_rank, _definition] = recommendation.split("-");
		rank = Number(_rank);
		definition = _definition.trim();
	} catch (error) {
		throw new Error(`recommendation not found on "${url}"`);
	}
	return {
		definition,
		rank,
		zrankRows: extended ? zrankRows : undefined,
	};
};
