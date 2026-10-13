import { cn } from "cn";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Calendar } from "@/shared/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/shared/components/ui/popover";

import { useDateRange, useDateRangeLabel } from "../model/date-range";

export function DateRangePicker({ className }: { className?: string }) {
	const { range, setRange } = useDateRange();
	const label = useDateRangeLabel();

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					className={cn("justify-start font-normal", className)}
				>
					<CalendarIcon data-icon="inline-start" />
					{label}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="end">
				<Calendar
					mode="range"
					resetOnSelect
					selected={range}
					defaultMonth={range.from}
					numberOfMonths={2}
					onSelect={(selected) => {
						if (!selected?.from) {
							return;
						}

						setRange({ from: selected.from, to: selected.to });
					}}
				/>
			</PopoverContent>
		</Popover>
	);
}
