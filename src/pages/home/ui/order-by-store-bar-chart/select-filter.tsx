import type { ReactNode } from "react";
import { Field, FieldLabel } from "@/shared/components/ui/field";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/shared/components/ui/select";

type SelectFilterOption = string;
type SelectFilterProps<T extends SelectFilterOption> = {
	label: string;
	icon?: ReactNode;
	value: T;
	options: readonly T[];
	placeholder: string;
	onValueChange: (value: T) => void;
	className?: string;
};

export function SelectFilter<T extends SelectFilterOption>({
	label,
	icon,
	value,
	options,
	placeholder,
	onValueChange,
	className,
}: SelectFilterProps<T>) {
	return (
		<Field className={className}>
			<FieldLabel className="items-center font-medium text-foreground text-xs tracking-[0.08em]">
				{icon}
				{label}
			</FieldLabel>
			<Select
				value={value}
				onValueChange={(nextValue) => onValueChange(nextValue as T)}
			>
				<SelectTrigger className="w-full bg-card">
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent>
					{options.map((option) => (
						<SelectItem key={option} value={option}>
							{option}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</Field>
	);
}
