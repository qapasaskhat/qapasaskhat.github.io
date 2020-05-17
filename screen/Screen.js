import React from 'react'
import {
    Text,
    View,
    StyleSheet,
    Image
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'firebase'
class Screen extends React.Component {
    state={
        text: 'Курс введения в базы данных знакомит слушателями с историей создания систем обработки структурированных данных, подходами к обработке информации, развитием моделей данных и систем управления данными. Основу курса составляет изучение и применение в типовых ситуациях средств SQL для обработки данных в SQL-СУБД. Выполнение практических задач в рамках курса предполагает использование СУБД MySQL.',
        course: {}
    }
    componentDidMount=async()=>{
        this.setState({
            course: this.props.navigation.getParam('param')
        })
        console.log(this.props.navigation.getParam('param'));   
    }

    _goto=(course)=>{
        //console.log(course);
        firebase.firestore().collection('courses').doc(course.id)
        .update({
            users:firebase.firestore.FieldValue.arrayUnion({
                id: firebase.auth().currentUser.uid
            })
        }).then(function() {
            console.log("Document successfully updated!");
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
        this.props.navigation.navigate('ScreenCourseOpen',{param:course})
    }
    render(){
        const {course} = this.state
        return(
            <View style={styles.container}>
                <LinearGradient 
                    colors={['#66B9A8', '#66B98A']} style={styles.gradient}>
                    <Image source={{uri: course.img}} style={styles.img}/>
                    <View style={styles.nameCourse}>
                    <Text style={styles.nameText}>{course.title}</Text>
                        <Text style={{
                            textAlign:'right',
                            fontWeight: 'bold',
                            fontSize: 16,
                            top:5
                        }}>{course.author}</Text>
                    </View>
                    <View style={styles.description}>
                        <TouchableOpacity onPress={()=>alert(this.state.text)}>
                        <Text style={{
                            fontSize: 13,
                            fontWeight: 'bold'
                        }}>Описание</Text>
                        
                        <Text 
                        numberOfLines={8}
                        style={{
                            fontSize: 13,

                        }}>{course.description}</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.start}>
                        <TouchableOpacity onPress={()=>this._goto(course)}>
                            <Text style={{
                                fontSize: 14,
                                fontWeight: 'bold',
                                margin: 5,
                                letterSpacing: 2,
                                textTransform: 'uppercase',
                                color: '#459786'
                            }}>Start</Text>
                        </TouchableOpacity>
                    </View>

                </LinearGradient>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1 ,
        backgroundColor: '#fff',
        //justifyContent:'center',
        alignItems: 'center'
    },
    gradient:{
        width:'90%',
        margin: 15,
        alignItems:'center',
        paddingTop: 12,
        borderRadius:5
    },
    img:{
        width: '95%',
        height: 270,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#459786',
        
    },
    nameCourse:{
        height: 75,
        width: '80%',
        backgroundColor:'#fff',
        top:-32,
        borderRadius:5,
        borderWidth: 1,
        borderColor: '#459786',
        padding: 8
    },
    nameText:{
        fontSize: 16,
        fontWeight: 'bold',
    },
    description:{
        backgroundColor: '#fff',
        width: '80%',
        top: -20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#459786',
        padding: 8,
    },
    start:{
        width: '80%',
        borderRadius: 5,
        borderColor: '#459786',
        borderWidth: 1,
        backgroundColor: '#fff',
        top: -12,
        alignItems: 'center',
        height:30,
        marginTop: 30
    }
})

export default Screen