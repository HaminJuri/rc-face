const TheRadio = ({ label, value, name, id, checked, onChange, enLabel, disabled }) => {
    return (
        <li
            className={`flex w-full items-center gap-x-2 rounded-md p-1 ${
                disabled ? "bg-neutral-100" : "bg-orange-50 text-neutral-600"
            }`}
        >
            <input
                type="checkbox"
                name={name}
                id={id}
                checked={checked}
                value={value}
                disabled={disabled}
                onChange={onChange}
                className={`h-4 w-4 appearance-none rounded-md border-2 bg-white checked:border-transparent checked:bg-orange-500 ${
                    disabled ? "border-neutral-400" : "border-orange-500"
                }`}
            />
            <label
                htmlFor={id}
                className={`cursor-pointer text-sm font-bold tracking-tight ${!enLabel ? "grow" : ""} ${
                    disabled ? "text-neutral-400" : "text-neutral-600"
                }`}
            >
                {label}
            </label>
            {!!enLabel && (
                <label
                    htmlFor={id}
                    className={`flex grow cursor-pointer items-center justify-end font-serif text-xs font-bold capitalize ${
                        disabled ? "text-neutral-400" : "text-orange-400"
                    }`}
                >
                    {enLabel}
                </label>
            )}
        </li>
    );
};

export default TheRadio;
