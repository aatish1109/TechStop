import React,{useState,useEffect} from 'react'
import {Link,useLocation,useNavigate} from 'react-router-dom'
import  {Form,Button,Col} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckOutSteps from '../components/CheckOutSteps'
import { savePaymentMehtod } from '../actions/cartActions'


function PaymentScreen() {

    const cart=useSelector(state=>state.cart)
    const {shippingAddress}=cart
  
    const dispatch=useDispatch()


    const navigate=useNavigate()

    const [paymentMethod,setPaymentMethod]=useState('PayPal')

    if(!shippingAddress.address){
        navigate('/shipping')
    }

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(savePaymentMehtod(paymentMethod))
        navigate('/placeorder')
    }

  return (
    <FormContainer>
        <CheckOutSteps step1 step2 step3/>

        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as ='legend'>Select Method</Form.Label>
                <Col>
                    <Form.Check
                      type='radio'
                      label='PayPal or CreditCard'
                      id='PayTM'
                      name='paymentMethod'
                      checked
                      onChange={(e)=>setPaymentMethod(e.target.value)}
                    >

                    </Form.Check>
                </Col>
            </Form.Group>
            <Button type='submit' variant='primary' >
                Continue
            </Button>
        </Form>

    </FormContainer>
  )
}

export default PaymentScreen