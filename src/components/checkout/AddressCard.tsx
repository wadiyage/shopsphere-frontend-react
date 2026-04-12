import type { Address } from "../../types/models/Address"

type Props = {
    address: Address
    isSelected: boolean
    onSelect: () => void
    onEdit: () => void
    onDelete: () => void
    onSetDefault: () => void
}

const AddressCard = ({
    address,
    isSelected,
    onSelect,
    onEdit,
    onDelete,
    onSetDefault,
}: Props) => {
    return (
        <div
            className={`rounded-3xl border p-5 transition ${
                isSelected
                    ? "border-slate-900 bg-slate-50 shadow-sm"
                    : "border-slate-200 bg-white hover:border-slate-300"
            }`}
        >
            <div className="flex items-start gap-4">
                <div className="flex items-start gap-3">
                    <input
                        type="radio"
                        name="selectedAddress"
                        checked={isSelected}
                        onChange={onSelect}
                        className="mt-1 h-5 w-5 text-slate-900 accent-slate-900"
                    />
                    <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                            <p className="text-sm font-semibold text-slate-950">{address.fullName}</p>
                            {address.isDefault && (
                                <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                                    Default
                                </span>
                            )}
                        </div>
                        <p className="mt-3 text-sm text-slate-600">
                            {address.addressLine}
                        </p>
                        <p className="text-sm text-slate-600">
                            {address.city}, {address.state} {address.postalCode}
                        </p>
                        <p className="mt-1 text-sm text-slate-600">{address.phone}</p>
                    </div>
                </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
                <button
                    type="button"
                    onClick={onEdit}
                    className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                    Edit
                </button>
                <button
                    type="button"
                    onClick={onDelete}
                    className="rounded-full border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100"
                >
                    Delete
                </button>
                {!address.isDefault && (
                    <button
                        type="button"
                        onClick={onSetDefault}
                        className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                    >
                        Set default
                    </button>
                )}
            </div>
        </div>
    )
}

export default AddressCard