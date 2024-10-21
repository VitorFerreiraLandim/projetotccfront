import './index.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function CodigoDeRedefinição() {
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [codigoEnviado, setCodigoEnviado] = useState(null); // Armazena o código enviado
    const navigate = useNavigate();

    useEffect(() => {
        // Aqui você pode buscar o código enviado, por exemplo, armazenando em localStorage
        const codigo = localStorage.getItem('codigoEnviado'); // Supondo que você tenha armazenado o código enviado no localStorage
        if (codigo) {
            setCodigoEnviado(codigo);
        }
    }, []);

    const handleChange = (index, value) => {
        if (!/^\d?$/.test(value)) {
            return; 
        }

        const newCode = [...code];

        if (value === '') {
            if (index > 0) {
                const prevField = document.getElementById(`input-${index - 1}`);
                if (prevField) {
                    prevField.focus();
                }
            }
            newCode[index] = '';
        } else {
            newCode[index] = value.slice(-1);
            if (value && index < 5) {
                const nextField = document.getElementById(`input-${index + 1}`);
                if (nextField) {
                    nextField.focus();
                }
            }
        }

        setCode(newCode);

        if (newCode.every((digit) => digit !== '')) {
            const completeCode = newCode.join('');
            console.log('Código completo:', completeCode);
        }
    };

    const handleConfirm = async () => {
        const completeCode = code.join('');
        if (completeCode === codigoEnviado) {
            navigate('/novaSenha');
        } else {
            alert('Código incorreto. Tente novamente.'); 
        }
    };

    return (
        <div className='codigo'>
            <div className='login'>
                <div className='informaçoes'>
                    <h1>Confira seu E-mail</h1>
                    <p>Enviamos o código de redefinição de senha para seu e-mail, insira o código abaixo</p>
                    
                    <div className='codigo-inputs'>
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                id={`input-${index}`}
                                type='text'
                                maxLength='1'
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                className='codigo-input'
                            />
                        ))}
                    </div>

                    <div className='botao'> 
                        <button onClick={handleConfirm} className='b2'>Confirmar</button>
                    </div>             
                </div>
            </div>
        </div>
    );
}