import { useState, type FormEvent } from "react"
import { toast } from "react-toastify"

import type { Address } from "../../types/models/Address"
import type { CheckoutPayload, PaymentMethod } from "../../types/models/Checkout"
import { useAddresses } from "../../hooks/useAddresses"
import AddressList from "./AddressList"
import AddressModal from "./AddressModal"
import type { AddressFormValues } from "./AddressModal"
import ConfirmDialog from "./ConfirmDialog"

type Props = {
  onSubmit: (data: CheckoutPayload) => void
  isSubmitting: boolean
  cartEmpty: boolean
}

const CheckoutForm = ({ onSubmit, isSubmitting, cartEmpty }: Props) => {
  const {
    addresses,
    selectedAddressId,
    isLoading,
    isSaving,
    error: addressError,
    selectAddress,
    createNewAddress,
    updateExistingAddress,
    deleteAddress,
    setAddressAsDefault,
  } = useAddresses()

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("CASH_ON_DELIVERY")

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  const [deleteAddressId, setDeleteAddressId] = useState<number | null>(null)

  const [formError, setFormError] = useState<string | null>(null)

  const addressSelected = Boolean(selectedAddressId)
  const disableSubmit = isSubmitting || cartEmpty || !addressSelected || isLoading

  const openNewAddressModal = () => {
    setEditingAddress(null)
    setIsModalOpen(true)
  }

  const openEditAddress = (address: Address) => {
    setEditingAddress(address)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingAddress(null)
  }

  const handleAddressSave = async (payload: AddressFormValues) => {
    try {
      if (editingAddress) {
        await updateExistingAddress(editingAddress.id, payload)
      } else {
        await createNewAddress(payload)
      }
      setIsModalOpen(false)
    } catch {
      // error is handled in hook
    }
  }

  const handleDeleteAddress = async () => {
    if (deleteAddressId === null) {
      return
    }

    try {
      await deleteAddress(deleteAddressId)
      setDeleteAddressId(null)
    } catch {
      // error is handled in hook
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (cartEmpty) {
      toast.error("Your cart is empty. Add items before placing an order.")
      return
    }

    if (!selectedAddressId) {
      setFormError("Please select a delivery address.")
      return
    }

    setFormError(null)

    const payload: CheckoutPayload = {
      addressId: selectedAddressId,
      paymentMethod,
    }

    onSubmit(payload)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-950">Delivery address</h2>
              <p className="mt-1 text-sm text-slate-500">
                Pick an address or add a new one for this order.
              </p>
            </div>
            <button
              type="button"
              onClick={openNewAddressModal}
              className="inline-flex items-center justify-center rounded-full bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Add New Address
            </button>
          </div>

          <div className="mt-6">
            <AddressList
              addresses={addresses}
              selectedAddressId={selectedAddressId}
              isLoading={isLoading}
              onSelectAddress={selectAddress}
              onEditAddress={openEditAddress}
              onDeleteAddress={(address) => setDeleteAddressId(address.id)}
              onSetDefaultAddress={(address) => void setAddressAsDefault(address.id)}
            />
          </div>

          {addressError && (
            <div className="mt-4 rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {addressError}
            </div>
          )}
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">Payment method</h2>
          <p className="mt-1 text-sm text-slate-500">
            Choose the payment option you want to use for this order.
          </p>

          <div className="mt-6 space-y-3">
            {(["CASH_ON_DELIVERY", "CARD"] as PaymentMethod[]).map((method) => (
              <label
                key={method}
                className={`flex cursor-pointer items-center gap-3 rounded-3xl border px-4 py-4 transition ${paymentMethod === method
                  ? "border-slate-900 bg-slate-50"
                  : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={(event) => setPaymentMethod(event.target.value as PaymentMethod)}
                  className="h-5 w-5 text-slate-900 accent-slate-900"
                />
                <div>
                  <p className="text-sm font-semibold text-slate-950">
                    {method === "CASH_ON_DELIVERY" ? "Cash on Delivery" : "Credit/Debit Card"}
                  </p>
                  <p className="text-sm text-slate-500">
                    {method === "CASH_ON_DELIVERY"
                      ? "Pay when your order arrives."
                      : "Card payments are available at checkout."}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </section>

        {formError && (
          <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {formError}
          </div>
        )}

        <button
          type="submit"
          disabled={disableSubmit}
          className="flex w-full items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/70 border-t-white" />
              Processing...
            </>
          ) : (
            "Place Order"
          )}
        </button>
      </form>

      <AddressModal
        open={isModalOpen}
        initialAddress={editingAddress}
        isSaving={isSaving}
        error={addressError}
        onClose={closeModal}
        onSubmit={handleAddressSave}
      />

      <ConfirmDialog
        open={deleteAddressId !== null}
        title="Remove address"
        message="Are you sure you want to delete this address? This action cannot be undone."
        confirmLabel="Delete"
        loading={isSaving}
        onConfirm={handleDeleteAddress}
        onCancel={() => setDeleteAddressId(null)}
      />
    </>
  )
}

export default CheckoutForm
