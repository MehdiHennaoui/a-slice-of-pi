import { cn } from "cn";
import { CalendarIcon, XIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { Button } from "@/shared/components/ui/button";
import { Calendar } from "@/shared/components/ui/calendar";
import {
	Popover,
	PopoverClose,
	PopoverContent,
	PopoverTrigger,
} from "@/shared/components/ui/popover";
import { dateRangePickerText } from "./date-range-picker-text";

const copy = dateRangePickerText["date-range-picker"];

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
			<PopoverContent className="w-auto gap-0 p-0" align="end">
				<div className="flex justify-end px-1 pt-1">
					<PopoverClose asChild>
						<Button
							type="button"
							variant="ghost"
							size="icon-sm"
							aria-label={copy.close}
						>
							<XIcon />
						</Button>
					</PopoverClose>
				</div>
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
