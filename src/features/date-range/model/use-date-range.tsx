import { createContext, type ReactNode, useContext, useState } from "react";

import { CURRENT_YEAR } from "@/shared/config";
import { formatDateRange, yearDateRange } from "@/shared/lib/date";

export type DateRangeValue = {
	from: Date;
	to?: Date;
};

type DateRangeContextValue = {
	range: DateRangeValue;
	setRange: (range: DateRangeValue) => void;
};

const DateRangeContext = createContext<DateRangeContextValue | null>(null);

export function DateRangeProvider({ children }: { children: ReactNode }) {
	const [range, setRange] = useState<DateRangeValue>(() =>
		yearDateRange(CURRENT_YEAR),
	);

	return (
		<DateRangeContext.Provider value={{ range, setRange }}>
			{children}
		</DateRangeContext.Provider>
	);
}

export function useDateRange() {
	const context = useContext(DateRangeContext);

	if (!context) {
		throw new Error("useDateRange must be used within a DateRangeProvider");
	}

	return context;
}

export function useDateRangeLabel() {
	const { range } = useDateRange();

	return formatDateRange(range.from, range.to ?? range.from);
}
