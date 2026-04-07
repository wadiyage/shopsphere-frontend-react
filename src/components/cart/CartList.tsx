import type { CartDisplayItem } from "../../types/models/CartDisplayItem"
import type { CartItem } from "../../types/models/CartItem"
import CartItemCard from "./CartItemCard"

type Props = {
    items: CartDisplayItem[]
    pendingUpdates: Record<number, boolean>
    pendingRemovals: Record<number, boolean>
    onUpdate: (item: CartItem, quantity: number) => void
    onRemove: (item: CartItem) => void
}

const CartList = ({
    items,
    pendingUpdates,
    pendingRemovals,
    onUpdate,
    onRemove
}: Props) => {
    return (
        <section className="space-y-5">
            {items.map((item) => (
                <CartItemCard
                    key={item.id}
                    item={item}
                    isUpdating={Boolean(pendingUpdates[item.id])}
                    isRemoving={Boolean(pendingRemovals[item.id])}
                    onUpdate={onUpdate}
                    onRemove={onRemove}
                />
            ))}
        </section>
    )
}

export default CartList
