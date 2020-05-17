import React, { useReducer } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    ActivityIndicator
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import {  TouchableOpacity, FlatList } from 'react-native-gesture-handler'
import firebase from 'firebase'
import { connect } from 'react-redux'
import { fetchUserCourse,user } from '../api/user/actions'

class CourseScreen extends React.Component{

    static navigationOptions={
        title: 'hello'
    }

    state = {
        courses: [],
        user:{},
        value: true
    }

    componentDidMount = ()=>{
        this.props.dispatch(user())
        this.props.dispatch(fetchUserCourse())

        
    }
    goTo=(course)=>{
        this.props.navigation.navigate('ScreenCourseOpen',{param:course})
    }
    renderCourse = course =>{
        return(
            <TouchableOpacity onPress={()=>this.goTo(course)}>
                <LinearGradient 
                colors={['#66B9A8', '#66B98A']}
                style={styles.courseCard}>
                <Image source={{uri: course.img}} style={styles.cardImg}/>
                <View style={styles.txtView}>
                    <Text>Название курса:</Text>
                    <Text style={styles.textStyle}>{course.title}</Text>
                    <Text>Количество уроков: <Text style={styles.textStyle}>{course.lessons}</Text></Text>
                   
                    <Text>Автор курса: </Text>
                    <Text style={styles.textStyle}>{course.author}</Text>
                    <Text style={{
                        marginTop:10
                    }}>Пройдено: <Text style={styles.textStyle}>{
                        course.finished.length
                    } из {course.lessons}</Text> </Text>
                    <View style={styles.progress}>
                        <View style={{
                            height: 2,
                            width:`${course.finished.length*100/course.lessons}%`,
                            backgroundColor: 'red'
                        }}/>
                    </View>
                </View>
            </LinearGradient>
        </TouchableOpacity>
        )
    }
    render(){
        const { items,loading } = this.props
        return(
            <View style={styles.container}>
                <View style={styles.switch}>
                    <View style={{
                        margin:3,
                        backgroundColor:this.state.value?'#66B9A8':'#fff',
                        borderRadius: 5,
                        height:36,
                        justifyContent:'center',
                        width:'48%',
                        alignItems:'center'
                    }}>
                        <TouchableOpacity onPress={()=>this.setState({
                            value: true
                        })}>
                            <Text style={{
                                color:this.state.value?'#fff':'#66B9A8',
                                fontSize: 14,
                                fontWeight: 'bold',
                                letterSpacing: 2
                            }}>Сейчас изучаю</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                         margin:3,
                         backgroundColor:this.state.value?'#fff':'#66B9A8',
                         borderRadius: 5,
                         height:36,
                         justifyContent:'center',
                         width:'48%',
                         alignItems:'center'
                    }}>
                        <TouchableOpacity onPress={()=>{
                            this.setState({
                                value: false
                            })
                        }}>
                            <Text style={{
                                fontSize: 14,
                                color: this.state.value?'#459786':'#fff',
                                fontWeight:'bold',
                                letterSpacing:2
                            }}>Завершенные</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {
                    loading?<View>
                        <ActivityIndicator color={'#66B9A8'} size={'large'} animating={true}/>
                    </View>:
                
                <FlatList style={styles.feed} 
                    data={this.state.value?items:items}
                    renderItem = {({item})=>this.renderCourse(item)}
                    keyExtractor = {item=>item.id}
                    showsVerticalScrollIndicator = {false} 
                 />}
            </View>
        );
    }
}
 const styles = StyleSheet.create({
     container:{
         flex: 1,
         //justifyContent: 'center',
         alignItems: 'center',
         paddingTop: 32,
         backgroundColor:'#fff'
     },
     switch:{
         width:'90%',
         height:40,
         borderRadius: 5,
         borderColor:'#66B9A8',
         borderWidth: 1,
         marginBottom: 8,
         flexDirection: 'row',
         alignItems:'center',
        // justifyContent:'space-around'
     },
     learming:{
         
     },
     learming_p:{
       
    },
     courseCard:{
        width:'90%',
        height: 172,
        borderColor:'#66B9A8',
        borderRadius: 5,
        borderWidth:1,
        alignSelf:'center',
        marginRight:15,
        marginLeft: 15,
        paddingTop: 14,
        paddingLeft: 4,
        flexDirection:'row',
        marginBottom: 15,

    },
    cardImg:{
        width: 160,
        height: 140,
    },
    txtView:{
        marginLeft: 10
    },
    textStyle:{
        fontSize:13,
        color: '#fff',
        fontWeight: '600',
        maxWidth: 200
    },
    progress:{
        height:2,
        width: '90%',
        backgroundColor:'#fff',
        marginTop:5,
        marginBottom:10
    }
 })

 const mapStateToProps = state =>({
    items: state.userCourseReducer.items,
    loading: state.userCourseReducer.loading,
    error: state.userCourseReducer.error,
})
 export default connect(mapStateToProps) (CourseScreen)