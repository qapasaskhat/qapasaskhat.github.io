import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    TextInput,
    Dimensions,
} from 'react-native'
import Fire from '../api/Fire'

const { width,height } = Dimensions.get('screen')

import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';


class RegisterScreen extends React.Component{
    state={
        user :{
            email:'',
            password: '',
            name: '',
            phone_number: ''
        },
        photo: null,
        erorMessage: null,
        params: '',
    }
    componentDidMount = () =>{
        this.setState({
            params: this.props.navigation.getParam('param')
        })
        console.log(this.state.params)
        this.getPermissionAsync()
        
    }


  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };
  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ photo: result.uri });
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };


    handleLogin=()=>{
        const {photo} = this.state
        
        Fire.shared.creteUser(this.state.user,photo)
    }

    render(){
        return(
            <View style={styles.container}>
                <TouchableOpacity style={styles.addPhoto} onPress={this._pickImage}>
                    {this.state.photo &&<Image  source={{uri: this.state.photo}} style={{width:100, height:100, borderRadius:50,position:'absolute',zIndex:100}}/>}
                    <Image source={require('../img/add.png')} style={styles.addIcon}/>
                </TouchableOpacity>
                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                 </View>
                 <View>
                    <Text style={styles.txt}>ФИО</Text>
                    <TextInput  
                        style={styles.txtInput} 
                        autoFocus
                        onChangeText={name=>this.setState({user: {...this.state.user, name}})}
                        value={this.state.user.name}
                        placeholder='Введите ФИО'/>
                </View>
                <View>
                    <Text style={styles.txt}>Email</Text>
                    <TextInput  
                        style={styles.txtInput} 
                        autoFocus ={false}
                        onChangeText={email=>this.setState({user: {...this.state.user, email}})}
                        value={this.state.user.email}
                        placeholder='Введите email'/>
                </View>
                <View>
                    <Text style={styles.txt}>Номер телефона</Text>
                    <TextInput  
                        style={styles.txtInput} 
                        autoFocus  ={false}
                        onChangeText={phone_number=>this.setState({user: {...this.state.user, phone_number}})}
                        value={this.state.user.phone_number}
                        placeholder='Введите номер телефона'/>
                </View>
                <View>
                    <Text style={styles.txt}>Пароль</Text>
                    <TextInput 
                        style={styles.txtInput} 
                        secureTextEntry 
                        onChangeText={password=>this.setState({user: {...this.state.user, password}})}
                        value={this.state.user.password}
                        placeholder='Введите пароль'/>
                </View>
                <TouchableOpacity style={styles.btn} onPress={()=>this.handleLogin()}>
                    <Text style={{color: '#fff', fontSize: 12, fontWeight:'700', letterSpacing: 3}}>Регистрация</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
 const styles = StyleSheet.create({
     container:{
         flex: 1,
         //justifyContent: 'center',
         alignItems: 'center',
         backgroundColor:'#fff',
         paddingTop: 24
     },
     imgIcon:{
         width: 100,
         height: 100,
         resizeMode: 'contain',
     },
     txtInput:{
         borderWidth: 1,
         borderColor: '#459786',
         borderRadius: 5,
         width: width*0.8,
         height: 40,
         paddingLeft: 10
     },
     txt:{
         color: '#459786', 
         fontSize: 15,
         fontWeight: '600',
         margin: 5
    },
    btn:{
        width:width*0.6,
        height: 40,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#66B9A8',
        marginTop:14,
        borderRadius: 7
    },
    errorMessage:{
       // height:72,
        alignItems:'center',
        justifyContent:'center',
        marginHorizontal:30
    },
    error:{
        color: '#e9446a',
        fontSize: 13,
        fontWeight: '600',
        textAlign: 'center'
    },
    addPhoto:{
        width:100,
        height:100,
        borderRadius:50,
        borderWidth:1,
        borderColor: '#66B9A8',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#ECECEC'
    },
    addIcon:{
        width:32,
        height:32,
        resizeMode: 'contain',
        zIndex:1
    }
 })
 export default RegisterScreen