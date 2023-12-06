import { useState } from "react"
import { View , Text, StyleSheet,TextInput, Button,FlatList,Modal, TouchableOpacity } from "react-native"
import uuid from 'react-native-uuid'

const Boton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.Boton}>
    <Text style={styles.BotonText}>{title}</Text>
  </TouchableOpacity>
);

const App = () => {

    const [newTitleProduct,setNewTitleProduct] = useState("")
    const [newStateProduct,setNewStateProducts] = useState("")
    const [products,setProducts] = useState([])
    const [productSelected,setProductSelected] = useState({})
    const [modalVisible,setModalVisible] = useState(false)

    const handlerAddProduct = () => {
        const newProduct = {
          id:uuid.v4(),
          title:newTitleProduct,
          state:newStateProduct
        }
        setProducts(current => [...current,newProduct] )
        setNewTitleProduct("")
        setNewStateProducts("")
    }

    const handlerModal = (item) => {
        setProductSelected(item)
        setModalVisible(true)
    }
    const handlerDeleteProduct = () => {
      setProducts(current => current.filter(product => product.id !== productSelected.id))
      setModalVisible(false)
    }
    return  <View  style={styles.container}>
              <View style={styles.inputContainer}>
                <TextInput 
                style={styles.input}
                placeholder="Nombre"
                value={newTitleProduct}
                onChangeText={(t)=> setNewTitleProduct(t)}
                />
                <TextInput 
                style={styles.input}
                placeholder="Estado"
                value={newStateProduct}
                onChangeText={(t)=> setNewStateProducts(t)}
                />
              <TouchableOpacity style={styles.Boton} onPress={handlerAddProduct}>
                <Text style={styles.BotonText}> Agregar </Text>
                  </TouchableOpacity> 
              </View>
              <View style={styles.listContainer}>
                <FlatList
                  data={products}
                  keyExtractor={item => item.id}
                  renderItem={({item})=> <View style={styles.cardProduct}>
                                            <Text style={styles.cardTitle}>{item.title}:</Text>
                                            <Text>{item.state} </Text>
                                            <TouchableOpacity style={styles.Boton} onPress={() => handlerModal(item)}>
                                              <Text style={styles.BotonText}> Borrar </Text>
                                            </TouchableOpacity>                                           
                                          </View> }
                />
              </View>
              <Modal
                visible={modalVisible}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                      <Text style={styles.modalText}>¿Estas seguro de querer borrar el siguiente producto?</Text>
                      <Text style={styles.modalText}>Nombre: {productSelected.title}</Text>
                      <Button title="Confirmo" onPress={handlerDeleteProduct} />
                      <Button title="Cerrar" onPress={()=>setModalVisible(false)}/>
                  </View>
               </View>
              </Modal>
           </View>
    
  }

  const styles = StyleSheet.create({
    container:{
      flex:1,
      justifyContent:"start",
      alignItems:"center",
      backgroundColor: '#00A676',
    },
    inputContainer:{
      marginTop:60,
      flexDirection:"row",
      alignItems:"center",
      width:"100%",
      paddingLeft:4,
      justifyContent:"space-around"

    },
    input:{
      borderWidth:4,
      paddingHorizontal:10,
      paddingVertical:5,
      backgroundColor: '#F7F9F9',
      width:150,
      borderWidth:3,
      borderRadius: 10,
      borderColor: 'black'
    },
    listContainer : {
      
      width:"100%"
    },
    cardProduct:{
      flexDirection:"row",
      padding:10,
      margin:10,
      justifyContent:"space-around",
      alignItems:"center",
      backgroundColor: '#E0D0C1',
      borderWidth:3,
      borderRadius: 15,
      borderColor: 'black'
    },
  cardTitle: {
    color: "black",
    fontWeight: "bold",
    fontSize: 15,
  },

    modalContainer:{
      flex:1,
      alignItems:"center",
      justifyContent:"center",
      marginBottom: 100,
    },
    modalContent:{
      width:"80%",
      borderWidth:2,
      padding:10,
      gap:10,
      backgroundColor: '#601700',
    },
    modalText:{
      textAlign:"center",
      color:"#F7F9F9"
    },
    Boton: {
      elevation: 20,
      backgroundColor: "#434371",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 5,
      
    },
    BotonText: {
      color: "#E0D0C1",
      fontWeight: "bold",
    },

 
  })



export default App
