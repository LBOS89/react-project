import { useState } from 'react';
import './Form.scss';
import api from './../../../api';
import uuid from 'react-uuid';
import LoadingSpin from 'react-loading-spin';

export default function Form() {
    const [style, setStyle] = useState('');
    const [crust, setCrust] = useState('');
    const [extraCheese, setExtraCheese] = useState(false);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [errorMessage, setErrorMessage] = useState([]);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(false);
    const [sent, setSent] = useState(false)
    const [id, setId] = useState();

    const handleStyleChange = (event) => {
        const value = event.target.value;
        setStyle(value);
    }

    const handleCrustChange = (event) => {
        const value = event.target.value;
        setCrust(value);
    }
    
    const handleCheeseChange = (event) => {
        setExtraCheese(!extraCheese);
    }
    
    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }
    const handleAddressChange = (event) => {
        const value = event.target.value;
        setAddress(value);
    }    

    const handleSubmit = (event) => {
        event.preventDefault();
        if(style === '' && !errorMessage.includes('Please select a style of pizza')) {
            setErrorMessage(errorsArray => [...errorsArray, 'Please select a style of pizza']);          
        } else if (style !== '' && errorMessage.includes('Please select a style of pizza')) {
            setErrorMessage(errorMessage.filter(err => err !== 'Please select a style of pizza'));             
        }
        if(crust === '' && !errorMessage.includes('Please select a crust')) {
            setErrorMessage(errorsArray => [...errorsArray, 'Please select a crust']);
        } else if (crust !== '' && errorMessage.includes('Please select a crust')) {
            setErrorMessage(errorMessage.filter(err => err !== 'Please select a crust'));             
        }
        if(name === '' && !errorMessage.includes('Please enter your name')) {
            setErrorMessage(errorsArray => [...errorsArray, 'Please enter your name']);
        } else if (name !== '' && errorMessage.includes('Please enter your name')) {
            setErrorMessage(errorMessage.filter(err => err !== 'Please enter your name'));             
        }
        if(address === '' && !errorMessage.includes('Please enter your address')) {
            setErrorMessage(errorsArray => [...errorsArray, 'Please enter your address']);
        } else if (address !== '' && errorMessage.includes('Please enter your address')) {
            setErrorMessage(errorMessage.filter(err => err !== 'Please enter your address'));             
        }
        if (style !== '' && crust !== '' && name !== '' && address !== ''){
            setErrorMessage([]);
            setSaving(true);

            const newOrder = {
                id: uuid().replace(/\D/g, ""),
                style: style,
                crust: crust,
                cheese: extraCheese,
                name: name,
                address: address
            };

            api.post('/orders', newOrder)
            .then((response) => {
                if(response.status === 201) {
                    setSaving(false);
                    setSent(true);
                }
            })
            .catch((error) => {
                setError(true);
                if(error.response) {
                    console.log(error.response.status);
                    console.log(error.response.data);
                } else if(error.request) {
                    console.log(error.request);
                } else {
                    console.log(error.message);
                }
            });            
        }
    }
    
    return (
        <div>
            {!sent && !error &&
                <form onSubmit={handleSubmit} className='formDiv'>
                    {errorMessage.length > 0 &&
                        <div className='errorDiv'>
                            Oops! Looks like you forgot something: 
                            <ul>
                                {errorMessage.map((err, index) => (
                                    <li key={index} className='error'>{err}</li>
                                ))}
                            </ul>  
                        </div>
                    }                
                    <div>
                        <label>Style: 
                            <select
                                value={style}
                                onChange={handleStyleChange}
                                className='input'
                            >
                                <option className='input' value=''>Please Select</option>
                                <option className='input' value='Canadian'>Canadian</option>
                                <option className='input' value='Cheese'>Cheese</option>
                                <option className='input' value='Hawaiian'>Hawaiian</option>
                                <option className='input' value='Margherita'>Margherita</option>
                                <option className='input' value='Pepperoni'>Pepperoni</option>
                                <option className='input' value='Supreme'>Supreme</option>
                            </select> 
                        </label> 
                    </div>
                    <div>
                    <label>Crust: 
                            <select
                                value={crust}
                                onChange={handleCrustChange}
                                className='input'
                            >
                                <option className='input' value=''>Please Select</option>
                                <option className='input' value='Original'>Original Crust</option>
                                <option className='input' value='Thin'>Thin Crust</option>
                                <option className='input' value='Gluten-Free'>Gluten-Free Crust</option>
                            </select> 
                        </label>                    
                    </div>  
                    <div>
                        <label>Extra Cheese
                            <input
                            name="cheese"
                            type="checkbox"
                            checked={extraCheese}
                            onChange={handleCheeseChange}
                            className='checkbox' />                        
                        </label> 
                    </div>
                    <div>
                        <label>Name: 
                            <input 
                                type='text'
                                maxLength='150' 
                                value={name}
                                onChange={handleNameChange}
                                className='input'
                            />
                        </label> 
                    </div>
                    <div>
                        <label>Address: 
                            <input 
                                type='text'
                                maxLength='150' 
                                value={address}
                                onChange={handleAddressChange}
                                className='input'
                            />
                        </label> 
                    </div>
                    <button 
                        type='submit'
                        className='addButton'
                    >Submit Order</button> 
                    {saving && 
                        <div className='savingDiv'>
                            <p className='sending'>Sending . . .</p>
                            <LoadingSpin 
                                width='5px'
                                size='30px'
                                primaryColor='#051f0f'
                                secondaryColor='#92BFB1'
                            />
                        </div>                
                    }                                            
                </form>  
            }
            {error &&
                <p className='error'>Something went wrong.</p>         
            }
            {sent && !error &&
                <div className='orderPlacedDiv'>
                    <p className='orderPlaced'>ORDER PLACED</p>
                    <p className='orderPlacedSub'>We'll start working on your {crust} Crust {style} Pizza {extraCheese ? 'with Extra Cheese' : ''} right away, {name}!</p>
                </div>
            }
        </div>         
    );  
}