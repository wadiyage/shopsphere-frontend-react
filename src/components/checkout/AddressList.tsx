import type { Address } from "../../types/models/Address"
import AddressCard from "./AddressCard"

type Props = {
    addresses: Address[]
    selectedAddressId: number | null
    isLoading: boolean
    onSelectAddress: (addressId: number) => void
    onEditAddress: (address: Address) => void
    onDeleteAddress: (address: Address) => void
    onSetDefaultAddress: (address: Address) => void
}

const AddressList = ({
    addresses,
    selectedAddressId,
    isLoading,
    onSelectAddress,
    onEditAddress,
    onDeleteAddress,
    onSetDefaultAddress,
}: Props) => {
    if (isLoading) {
        return (
            <div className="space-y-4">
                {[1, 2].map((item) => (
                    <div
                        key={item}
                        className="h-32 animate-pulse rounded-3xl bg-slate-100"
                    />
                ))}
            </div>
        )
    }

    if (addresses.length === 0) {
        return (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-600">
                No saved addresses yet. Add a new address to continue.
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {addresses.map((address) => (
                <AddressCard
                    key={address.id}
                    address={address}
                    isSelected={selectedAddressId === address.id}
                    onSelect={() => onSelectAddress(address.id)}
                    onEdit={() => onEditAddress(address)}
                    onDelete={() => onDeleteAddress(address)}
                    onSetDefault={() => onSetDefaultAddress(address)}
                />
            ))}
        </div>
    )
}

export default AddressList