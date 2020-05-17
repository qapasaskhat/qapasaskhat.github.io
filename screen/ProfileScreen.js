import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import firebase from 'firebase'

import { connect } from 'react-redux'
import { user } from '../api/user/actions'

class ProfileScreen extends React.Component{
    state = {
        user: {}
    }
    componentDidMount =() =>{
        this.props.dispatch(user())
    }
    render(){
        const { user } = this.props
        return(
            <View style={styles.container}>
                <View style={styles.avatarView}>
                    {
                        user.photo===null?
                        <Image source={require('../img/profile.png')} style={styles.avatar} />:
                        <Image source={{uri: user.photo}} style={styles.avatar} />
                    }
                    
                </View>
                <View style={styles.txtContainer}>
                    <View style={styles.bgc}>
                        <Text style={styles.txt}>ФИО:</Text>
                        <Text style={styles.txtValue}>{user.name}</Text>
                    </View>
                    
                    <View style={styles.bgc}>
                        <Text style={styles.txt}>Email:</Text>
                        <Text style={styles.txtValue}>{user.email}</Text>
                    </View>
                    <View style={styles.bgc}>
                        <Text style={styles.txt}>Номер телефона:</Text>
                        <Text style={styles.txtValue}>{user.phone_number}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.btn}>
                    <Text style={{
                        color: '#fff',
                        fontWeight: '700'
                    }}>Редактировать профиль</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>firebase.auth().signOut()} style={styles.btn}>
                    <Text style={{
                        color: '#fff',
                        fontWeight: '700'
                    }}>Выйти</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
 const styles = StyleSheet.create({
     container:{
         flex: 1,
         //justifyContent: 'center',
       //  alignItems: 'center',
         backgroundColor:'#fff',
         paddingTop: 32
     },
     avatarView:{
         width: 152,
         height: 152,
         borderRadius: 76,
         borderWidth: 2,
         borderColor: 'rgba(102, 185, 169, 0.29)',
         marginTop: 25,
         alignSelf:'center',
         justifyContent:'center',
         alignItems:'center'
     },
     avatar:{
        width: 149,
        height: 149,
        borderRadius: 75,
        resizeMode:'contain'
     },
     txtContainer:{
         margin: 16,
         marginTop:60,
     },
     txt:{
         fontSize: 15,
         fontWeight: '600',
         letterSpacing: 1,
         lineHeight: 17,
         fontStyle:'normal',
        // marginVertical:8,
        color: '#000',
        fontWeight:'600'
     },
     txtValue:{
        fontSize: 15,
        fontWeight: '300',
        letterSpacing: 1,
        lineHeight: 17,
        fontStyle:'normal',
        color:'rgba(0, 0, 0, 0.7)',
        //marginHorizontal:8
     },
     btn:{
         marginTop:12,
         alignSelf:'center',
         width:'50%',
         height:40,
         backgroundColor:'#66B9A8',
         justifyContent:'center',
         alignItems:'center',
         borderRadius:8
     },
     bgc:{
        height:40,
        flexDirection: 'row',
        borderRadius: 10,
        borderColor: 'rgba(102, 185, 169, 0.29)',
        borderWidth: 1,
        justifyContent:'space-between',
        paddingHorizontal: 12,
        alignItems:'center',
        marginBottom: 12,
        
    }
 })
 const mapStateToProps = state =>({
    user: state.userCourseReducer.user,
    loading: state.userCourseReducer.userLoad,
    error: state.userCourseReducer.userError,
})
 export default connect(mapStateToProps) (ProfileScreen)