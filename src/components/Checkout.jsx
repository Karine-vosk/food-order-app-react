import { use, useActionState } from 'react';
import Modal from './UI/Modal.jsx';
import CartContext from '../store/CartContext.jsx';
import { cartTotal } from '../util/helpers.js';
import { currencyFormatter } from '../util/formatting';
import Input from './UI/Input.jsx';
import Button from './UI/Button.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';
import useCheckoutData from '../hooks/useCheckoutData.js';
import Error from './Error.jsx';

const Checkout = () => {
  const { items, clearCart } = use(CartContext);
  const { progress, hideCheckout } = use(UserProgressContext);

  const { data, error, sendRequest, clearData } = useCheckoutData();

  const total = cartTotal(items);

  function handleClose() {
    hideCheckout();
  }

  function handleFinish() {
    hideCheckout();
    clearCart();
    clearData();
  }

  async function checkoutAction(prevState, formData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const street = formData.get('street');
    const postalCode = formData.get('postal-code');
    const city = formData.get('city');

    const customer = {
      name,
      email,
      street,
      'postal-code': postalCode,
      city,
    };
    const errors = [];

    if (
      name.trim() === '' &&
      name.street() === '' &&
      name.postalCode() === '' &&
      name.city() === ''
    ) {
      errors.push('Please provide your name.');
    }

    if (!email.includes('@')) {
      errors.push('Invalid email address');
    }

    await sendRequest(
      JSON.stringify({
        order: {
          items,
          customer,
        },
      }),
    );

    if (errors.length > 0) {
      return {
        errors,
        enteredValues: customer,
      };
    }

    return {
      errors: null,
    };
  }

  const [formState, formAction, pending] = useActionState(checkoutAction, {
    errors: null,
  });

  if (data && !error) {
    return (
      <Modal open={progress === 'checkout'} onClose={handleFinish}>
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>We will back to you with more details via email.</p>
        <div className='modal-actions'>
          <Button onClick={handleFinish}>Okay</Button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal open={progress === 'checkout'} onClose={handleClose}>
      <form action={formAction}>
        <h2>Checkout</h2>
        <p>Total amount: {currencyFormatter.format(total)}</p>
        <Input
          label='Full Name'
          id='name'
          type='text'
          defaultValue={formState.enteredValues?.name}
        />
        <Input
          label='E-Mail Address'
          id='email'
          type='email'
          defaultValue={formState.enteredValues?.email}
        />
        <Input
          label='Street'
          id='street'
          type='text'
          defaultValue={formState.enteredValues?.street}
        />
        <div className='control-row'>
          <Input
            label='Postal Code'
            id='postal-code'
            type='text'
            defaultValue={formState.enteredValues?.postalCode}
          />
          <Input
            label='City'
            id='city'
            type='text'
            defaultValue={formState.enteredValues?.city}
          />
        </div>
        <div className='modal-actions'>
          {!pending && (
            <>
              <Button type='button' textOnly onClick={handleClose}>
                {' '}
                Close
              </Button>
              <Button>Submit Order</Button>
            </>
          )}
        </div>
        {pending && <span>Sending order data...</span>}
        {error && <Error title='Failed to submit data' message={error} />}
        {formState.errors && (
          <ul className='errors'>
            {formState?.errors.map((error) => (
              <Error title='' message={error} key={error} />
            ))}
          </ul>
        )}
      </form>
    </Modal>
  );
};

export default Checkout;
