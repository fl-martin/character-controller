const Overlay = () => {
	return (
		<div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3 items-center opacity-60">
			<div className="flex flex-col items-center gap-1">
				<kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
					W
				</kbd>
				<div className="flex gap-1">
					<kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
						A
					</kbd>
					<kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
						S
					</kbd>
					<kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
						D
					</kbd>
				</div>
			</div>

			<div className="flex flex-col gap-2">
				<div className="flex gap-1 items-center">
					<kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
						Shift
					</kbd>
					<span className="text-white font-sans ">Run</span>
				</div>
				<div className="flex gap-1 items-center">
					<kbd className="px-4 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
						Spacebar
					</kbd>
					<span className="text-white font-sans ">Jump</span>
				</div>
			</div>
		</div>
	);
};

export default Overlay;
