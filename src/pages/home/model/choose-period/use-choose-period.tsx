import { createContext, type ReactNode, useContext, useState } from "react";

import { CURRENT_YEAR } from "@/shared/config";
import { formatDateRange, yearDateRange } from "@/shared/lib/date";

export type ChoosePeriodValue = {
	from: Date;
	to?: Date;
};

type ChoosePeriodContextValue = {
	range: ChoosePeriodValue;
	setRange: (range: ChoosePeriodValue) => void;
};

const ChoosePeriodContext = createContext<ChoosePeriodContextValue | null>(null);

export function ChoosePeriodProvider({ children }: { children: ReactNode }) {
	const [range, setRange] = useState<ChoosePeriodValue>(() =>
		yearDateRange(CURRENT_YEAR),
	);

	return (
		<ChoosePeriodContext.Provider value={{ range, setRange }}>
			{children}
		</ChoosePeriodContext.Provider>
	);
}

export function useChoosePeriod() {
	const context = useContext(ChoosePeriodContext);

	if (!context) {
		throw new Error("useChoosePeriod must be used within a ChoosePeriodProvider");
	}

	return context;
}

export function useChoosePeriodLabel() {
	const { range } = useChoosePeriod();

	return formatDateRange(range.from, range.to ?? range.from);
}
