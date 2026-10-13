import { cn } from "cn";
import dayjs from "dayjs";
import { CalendarSearchIcon, RotateCcwIcon } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import { DateRangePicker } from "@/shared/components/ui/date-range-picker";
import { CURRENT_YEAR } from "@/shared/config";
import { yearDateRange } from "@/shared/lib/date";

import {
	useChoosePeriod,
	useChoosePeriodLabel,
} from "../../model/choose-period/use-choose-period";
import { choosePeriodText } from "./choose-period-text";

const copy = choosePeriodText["choose-period"];

export function ChoosePeriod({ className }: { className?: string }) {
	const { range, setRange } = useChoosePeriod();
	const label = useChoosePeriodLabel();
	const defaultRange = yearDateRange(CURRENT_YEAR);
	const isDefault =
		dayjs(range.from).isSame(defaultRange.from, "day") &&
		dayjs(range.to ?? range.from).isSame(defaultRange.to, "day");

	return (
		<section className={cn(className)}>
			<Card className="flex h-full min-h-0 flex-col">
				<CardHeader>
					<CardTitle>
						<CalendarSearchIcon />
						<h1>{copy.title}</h1>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col gap-2">
						<DateRangePicker
							value={range}
							label={label}
							onChange={(selected) => {
								setRange({ from: selected.from, to: selected.to });
							}}
						/>
						<Button
							type="button"
							variant="outline"
							size="lg"
							className="w-full"
							disabled={isDefault}
							onClick={() => setRange(yearDateRange(CURRENT_YEAR))}
						>
							<RotateCcwIcon data-icon="inline-start" />
							{copy.reset}
						</Button>
					</div>
				</CardContent>
			</Card>
		</section>
	);
}
