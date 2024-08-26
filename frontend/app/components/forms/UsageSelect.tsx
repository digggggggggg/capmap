import { ChangeEventHandler } from "react";

enum Usages {
	mb10 = 10,
	mb30 = 30,
	mb50 = 50,
	mb70 = 70,
	mb100 = 100,
}

export const UsageSelector = ({
	onChange,
	max = 0,
	...props
}: {
	onChange: ChangeEventHandler<HTMLSelectElement>;
	max: number;
}) => {
	const usageOptions = Object.keys(Usages)
		.filter((key) => isNaN(Number(key))) // Filter out the numeric keys
		.map((key) => (
			<option key={key} value={Usages[key as keyof typeof Usages]}>
				{key}
			</option>
		));

	return (
		<select onChange={onChange} {...props}>
			{usageOptions}
		</select>
	);
};

export default UsageSelector;
