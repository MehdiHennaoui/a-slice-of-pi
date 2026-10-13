import { dataGuardText } from "./data-guard-text";

type DataGuardProps = {
	data: unknown;
	isPending?: boolean;
	children: React.ReactNode;
};

const copy = dataGuardText["data-guard"];

const fallbackClassName =
	"flex h-full min-h-40 items-center justify-center rounded-lg border border-border/80 border-dashed bg-muted/20 px-4 text-center text-muted-foreground text-sm";

function DataGuard({ data, children, isPending = false }: DataGuardProps) {
	if (isPending) {
		return <div className={fallbackClassName}>{copy.loading}</div>;
	}

	if (!Array.isArray(data) || data.length === 0) {
		return <div className={fallbackClassName}>{copy.empty}</div>;
	}

	return children;
}

export { DataGuard };
