import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import styled from 'styled-components';

const Texto = styled.Text`
  color: ${(props) => props.cor};
  font-size: ${(props) => props.tamanho};
  font-weight: bold;
  margin-top: 10px;
`;
const Back = styled.View`
  background-color: #071019;
  flex: 1;
  flex-direction: column;
  align-items: center;
`;
const Input = styled.TextInput`
  width: 100%;
  height: 40px;
  border-radius: 8px;
  border: 1px solid #085a88;
  color: white;
`;
const App = () => {
  const [altura, alteraAltura] = useState('');
  const [peso, alteraPeso] = useState('');
  const [imc, alteraImc] = useState(0);
  const [categoria, alteraCategoria] = useState('');
  const [cor, alteraCor] = useState('');

  const calcular = () => {
    const indice = (
      peso.replace(',', '.') / 
      ( altura.replace(',', '.')  *
      altura.replace(',', '.'))
    ).toFixed(2);
    alteraImc(indice);
    if(indice < 18.5){
      alteraCategoria('MAGREZA');
      alteraCor('#ADFF00')
    }else if(indice <= 24.9){
      alteraCategoria('NORMAL');
      alteraCor('#FFF500')
    }else if(indice <= 29.9){
      alteraCategoria('SOBREPESO');
      alteraCor('#FF7A00')
    }else if(indice <= 39.9){
      alteraCategoria('OBESIDADE');
      alteraCor('#FF0000')
    }else if(indice >= 40){
      alteraCategoria('OBESIDADE GRAVE');
      alteraCor('#7E03F9')
    }
  };

  return (
    <Back>
      <View style={estilo.content}>

        <Texto cor="#088A08" tamanho="28">
          Calculadora de IMC
        </Texto>
        <View style={estilo.viewInput}>
          <Texto cor="#085A88" tamanho="15">
            Peso (Kg)
          </Texto>
          <Input
            value={peso}
            onChangeText={(pesoInput) => alteraPeso(pesoInput)}
            keyboardType={'numeric'}
          />
          <Texto cor="#085A88" tamanho="15">
            Altura (m)
          </Texto>
          <Input
            value={altura}
            onChangeText={(alturalInput) => alteraAltura(alturalInput)}
            keyboardType={'numeric'}
          />
        </View>
        <TouchableOpacity style={estilo.botao} onPress={calcular}>
          <Text style={estilo.textBotao}>Calcular</Text>
        </TouchableOpacity>

        {imc > 0 && altura !== 0 && (
          <View style={estilo.imc}>
            <Texto cor="#085A88" tamanho="15">
              Valor do IMC: {imc}
            </Texto>
            <Texto cor={cor} tamanho="20">
              {categoria}
            </Texto>
          </View>
        )}
      </View>
    </Back>
  );
};
export default App;

const estilo = StyleSheet.create({
  botao: {
    width: '100%',
    height: 50,
    backgroundColor: 'transparent',
    borderWidth: 4,
    borderColor: '#088A08',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBotao: {
    color: '#088A08',
    fontSize: 23,
    fontWeight: 'bold',
  },
  viewInput: {
    marginTop: 15,
    width: '100%',
    marginBottom: 30,
    justifyContent: 'flex-start',
  },
  content: {
    marginTop: 50,
    width: '65%',
    alignItems: 'center',
  },
  imc: {
    width: '100%',
    height: 90,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#085A88',
    marginTop: '30%',
    borderRadius: 8,
  }
});
