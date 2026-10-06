export type ValidationResult = {
    overallScore: number;
    problemScore: number;
    marketScore: number;
    differentiationScore: number;
    monetizationScore: number;
    technicalScore: number;
    goToMarketScore: number;
    summary: string;
    biggestStrength: string;
    biggestRisk: string;
    recommendation: string;
};