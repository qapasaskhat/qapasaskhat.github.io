import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native'

class LoadingScreen extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <Image source={require('../img/education.png')} style={styles.eduIcon}/>
                <Text style={styles.txt}>Добро пожаловать в Education!</Text>
                <Image  source={require('../img/img.png')} style={styles.img}/>
                <View style={{flexDirection: 'row',marginTop: 10}}>
                    <TouchableOpacity 
                        style={styles.teacherView} 
                        onPress={()=>this.props.navigation.navigate('Register',{param:'teacher'})}>
                        <Image source={require('../img/teacher.png')} style={styles.imgView} />
                        <Text style={{fontSize: 13, color: '#66B9A8'}}>Регистрация</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.studentView} 
                        onPress={()=>this.props.navigation.navigate('Login',{param:'student'})}>
                        <Image source={require('../img/student.png')} style={styles.imgView} />
                        <Text style={{fontSize: 13, color: '#66B9A8'}}>Войти</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.suppoerText}>Служба поддержки</Text>
            </View>
        );
    }
}
 const styles = StyleSheet.create({
     container:{
         flex: 1,
         justifyContent: 'center',
         alignItems: 'center',
         backgroundColor: '#fff'
     },
     eduIcon:{
         width:100,
         height:100,
         resizeMode:'contain',
         marginTop: 48
     },
     txt:{
         fontSize: 18,
         color: '#66B9A8'
     },
     img:{
         width: '100%',
         height: 337,
         resizeMode:'contain',
     },
     teacherView:{
         width: 130,
         height: 100,
         borderWidth: 1,
         borderColor: '#66B9A8',
         borderRadius: 5,
         alignItems:'center',
         marginRight:10,
         justifyContent:'center'
     },
     studentView:{
        width: 130,
        height: 100,
        borderWidth: 1,
        borderColor: '#66B9A8',
        borderRadius: 5,
        alignItems:'center',
        marginLeft: 10,
        justifyContent:'center'
    },
    imgView:{
        width: 64,
        height:64,
        resizeMode:"contain",
    },
    suppoerText:{
        fontSize: 13, 
        color: '#66B9A8',
        marginTop: 20
    }
 })
 export default LoadingScreen