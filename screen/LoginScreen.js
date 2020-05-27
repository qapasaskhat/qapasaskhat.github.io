import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    Dimensions
} from 'react-native'
import firebase from 'firebase'

const { width, height } = Dimensions.get('screen')

import { connect } from 'react-redux'
import { authLogin } from '../api/auth/actions'

const mapStateToProps = state =>({
    user: state.authReducer.items,
    loading: state.authReducer.loading,
    error: state.authReducer.error
})

class LoginScreen extends React.Component{
    state={
        email:'',
        password: '',
        params: ''
    }
    componentDidMount = () =>{
        this.setState({
            params: this.props.navigation.getParam('param')
        })
        console.log(this.state.params)
        
    }
    handleLogin=()=>{
        const {email,password} = this.state
        let user = {
            email: email,
            password: password
        }
        this.props.dispatch(authLogin(user))
    }

    render(){
        const { user,loading,error } = this.props
        return(
            loading?<View style={{
                flex:1,
                justifyContent:'center',
                alignItems:'center',
            }}>
                <ActivityIndicator size={'large'} color={'#459786'}/>
            </View>:
            <View style={styles.container}>
                {
                    //this.state.params === 'student'?
                    //<Image source={require('../img/student.png')} style={styles.imgIcon}/>:
                    <Image source={require('../img/teacher.png')} style={styles.imgIcon}/>
                    
                }
                <View style={styles.errorMessage}>
                    {error && <Text style={styles.error}>{error}</Text>}
                 </View>
                <View>
                    <Text style={styles.txt}>Логин</Text>
                    <TextInput  
                        style={styles.txtInput} 
                        autoFocus 
                        onChangeText={email=>this.setState({email})}
                        value={this.state.email}
                        placeholder='Введите логин'/>
                </View>
                <View>
                    <Text style={styles.txt}>Пароль</Text>
                    <TextInput 
                        style={styles.txtInput} 
                        secureTextEntry 
                        onChangeText={password=>this.setState({password})}
                        value={this.state.password}
                        placeholder='Введите пароль'/>
                </View>
                <TouchableOpacity style={styles.btn} onPress={()=>this.handleLogin()}>
                    <Text style={{color: '#fff', fontSize: 14, fontWeight:'bold', letterSpacing: 3,textTransform:'uppercase'}}>Войти</Text>
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
         paddingTop: 64
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
         height:40,
         paddingLeft: 10
     },
     txt:{
         color: '#459786', 
         fontSize: 15,
         fontWeight: '600',
         margin: 5,
         letterSpacing:1
    },
    btn:{
        width: width*0.5,
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
        marginHorizontal:30,
        marginTop: 12
    },
    error:{
        color: '#e9446a',
        fontSize: 13,
        fontWeight: '600',
        textAlign: 'center'
    },
 })
 export default connect(mapStateToProps) (LoginScreen)