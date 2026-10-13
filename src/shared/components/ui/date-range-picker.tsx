import { cn } from "cn";
import { CalendarIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { Button } from "@/shared/components/ui/button";
import { Calendar } from "@/shared/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/shared/components/ui/popover";

type DateRangeValue = {
	from: Date;
	to?: Date;
};

type DateRangePickerProps = {
	value: DateRange;
	onChange: (range: DateRangeValue) => void;
	label: string;
	className?: string;
};

export function DateRangePicker({
	value,
	onChange,
	label,
	className,
}: DateRangePickerProps) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					size="lg"
					className={cn("w-full justify-start font-normal", className)}
				>
					<CalendarIcon data-icon="inline-start" />
					{label}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="end">
				<Calendar
					mode="range"
					resetOnSelect
					selected={value}
					defaultMonth={value.from}
					numberOfMonths={2}
					onSelect={(selected) => {
						if (!selected?.from) {
							return;
						}

						onChange({ from: selected.from, to: selected.to });
					}}
				/>
			</PopoverContent>
		</Popover>
	);
}
