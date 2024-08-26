import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import React from "react";

export const Alert = ({
	isOpen = false,
	onClose = () => {},
	onCancel = () => {},
	onContinue = () => {},
	Title = "Title",
	Description = "Description",
	Cancel = "Cancel",
	Continue = "Continue",
	children,
}: {
	isOpen?: boolean;
	onClose?: Function;
	onCancel?: Function;
	onContinue?: Function;
	Title?: string;
	Description?: string;
	Cancel?: string;
	Continue?: string;
	children: React.ReactNode;
}) => {
	return (
		<AlertDialog
			isOpen={isOpen}
			leastDestructiveRef={undefined}
			onClose={onClose}
		>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{Title}</AlertDialogTitle>
					<AlertDialogDescription>
						{Description || children}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={onCancel}>{Cancel}</AlertDialogCancel>
					<AlertDialogAction onClick={onContinue}>{Continue}</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
