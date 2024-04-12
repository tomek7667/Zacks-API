import { getQuote } from "./getQuote";

describe("getQuote", () => {
    it("should return a quote", async () => {
		const quote = await getQuote("AAPL");
		expect(quote.rank).toBeGreaterThan(0);
		expect(typeof quote.definition).toBe("string");
	});

	it("should return extended quote", async () => {
		const quote = await getQuote("AAPL", { extended: true });
		expect(quote.rank).toBeGreaterThan(0);
        expect(typeof quote.definition).toBe("string");
		expect(quote.zrankRows).toHaveLength(5);
	});

	it("should throw an error if symbol is not found", async () => {
		await expect(getQuote("INVALID")).rejects.toThrow();
	});
});