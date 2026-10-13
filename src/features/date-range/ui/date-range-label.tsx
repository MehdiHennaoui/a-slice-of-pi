import { DateRangePicker } from "@/shared/components/ui/date-range-picker";

import { useDateRange, useDateRangeLabel } from "../model/use-date-range";

export function DateRangeLabel({ className }: { className?: string }) {
	const { range, setRange } = useDateRange();
	const label = useDateRangeLabel();

	return (
		<DateRangePicker
			className={className}
			value={range}
			label={label}
			onChange={(selected) => {
				setRange({ from: selected.from, to: selected.to });
			}}
		/>
	);
}
