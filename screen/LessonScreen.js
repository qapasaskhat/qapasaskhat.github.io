import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image
} from 'react-native'
import firebase from 'firebase'
import {Video} from 'expo-av'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'

import { connect } from 'react-redux'
import { fetchCourse, searchCourse } from '../api/course/actions'

const mapStateToProps = state => ({
    items: state.courseReducer.items,
    loading: state.courseReducer.loading,
    error: state.courseReducer.error,
    data: state.courseReducer.data
})


const {width, height} = Dimensions.get('window')

class LessonScreen extends React.Component{
    state={
        lessons: {},
        id: '',
        value: 1,
        text: 'Курс введения в базы данных знакомит слушателями с историей создания систем обработки структурированных данных, подходами к обработке информации, развитием моделей данных и систем управления данными.Основу курса составляет изучение и применение в типовых ситуациях средств SQL для обработки данных в SQL-СУБД. Выполнение практических задач в рамках курса предполагает использование СУБД MySQL.Важную часть курса составляет рассмотрение основных этапов проектирования реляционных баз данных, рассмотрение аномалий структурированных данных.Помимо базовой части курса рассматриваются вопросы работы с SQL-базами данных в приложениях, описывается концепция ORM и вводятся определения, описываются области применения NoSQL-систем.'
    }

    componentDidMount=async()=>{
        this.setState({
            lessons: this.props.navigation.getParam('param').courses,
            id: this.props.navigation.getParam('param').id
        })
        console.log(this.props.navigation.getParam('param'));
        
    }
    DesciptionComponent=()=>{
        const {lessons} =this.state
        return(
            <View style={{
                alignItems:'center'
            }}>
                <Text style={{
                        fontSize:15,
                        margin:12,
                        letterSpacing: 1,

                    }}>{lessons.description}</Text>
                <Video
                    source={{ uri: lessons.video }}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode="cover"
                    shouldPlay={false}
                    isLooping
                    useNativeControls={true}
                    style={{ width: width*0.9, height: 300, }}
                    />
            </View>
        )
    }
    Documents=()=>{
        const {lessons} =this.state
        return(
            <View style={{
                alignItems: 'center',
                width: width*0.9,
                marginTop: 8
            }}>
                <Text>Всего {lessons.documents.length} докуменов</Text>
                {
                    lessons.documents.map((item)=>{
                        return (
                            <View style={{
                                borderBottomWidth: 1,
                                borderColor: '#E2E2E2',
                                width: '100%',
                                height: 40,
                                flexDirection:'row',
                                alignItems:'center',
                                justifyContent:'space-between',
                                marginBottom: 8
                            }}>
                               <View style={{
                                   flexDirection:'row',
                                   alignItems:'center',
                               }}>
                                    <View style={{
                                        width:35,
                                        height:35,
                                        backgroundColor: 'red',
                                        justifyContent:'center',
                                        alignItems:'center',
                                        borderRadius:8,
                                        marginRight: 5
                                    }}><Text style={{
                                        color: '#fff',
                                        fontWeight: '900'
                                    }}>.pdf</Text></View>
                                    <Text style={{
                                        fontSize: 14,
                                        fontWeight: '500',
                                        letterSpacing: 0,
                                        maxWidth: '85%'
                                    }}>{item.name}</Text>
                                </View> 
                                <TouchableOpacity style={{
                                    alignItems:'center'
                                }}>
                                    <Image source={require('../img/download.png')} style={{
                                        width: 25,
                                        height: 20
                                    }}/>
                                    <Text style={{
                                        fontSize: 12,
                                        
                                    }}>download</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    })
                }
                
            </View>
        )
    }

    Tasks=(items)=>{
        
        const {lessons,id} =this.state
        return(
        <View style={{
            alignItems: 'center',
            padding: 12,
        }}>
            <Text style={{
                        fontSize:15,
                        //margin:12,
                        letterSpacing: 1,

                    }}>{lessons.tasks}</Text>
            <View style={{
                flexDirection: 'row',
                alignItems:'center',
                marginTop: 64
            }}>
                <View style={{
                    height: 40,
                    borderWidth:1,
                    backgroundColor: '#ECECEC',
                    borderColor: '#ECECEC',
                    borderRadius: 5,
                    justifyContent:'center',
                    alignItems:'center',
                    paddingHorizontal: 24,
                    marginRight: 32
                }}>
                    <Text style={{
                        fontSize: 12
                    }}>Выберите файл</Text>
                </View>
                <TouchableOpacity style={{
                    height: 40,
                    backgroundColor: '#66B9A8',
                    justifyContent:'center',
                    paddingHorizontal:24,
                    borderRadius:5
                }} onPress={()=>{this._sendTask(lessons.name,id)}}>
                    <Text style={{
                        color:'#fff',
                        }}>Отправить</Text>
                </TouchableOpacity>
            </View>
        </View>
        )}

    _sendTask =(name,id)=>{
        console.log(id);
        
        firebase.firestore().collection('courses').doc(id)
        .update({
            finished:firebase.firestore.FieldValue.arrayUnion({
                name
            })
        }).then(function() {
            alert('Поздравляем, вы прошли этот урок. Переходите на следуюший')
            console.log("Document successfully updated!");
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }

    render() {
        const {items} = this.props
      return (
        <View style={styles.container}>
            <Text style={{
                fontWeight: 'bold',
                letterSpacing: 1,
                fontSize: 14,
                marginVertical: 5
            }}>{this.state.lessons.title}</Text>
            <Text style={{
                fontSize: 14,
                marginBottom: 5,
                textTransform: 'capitalize'
            }}>{this.state.lessons.name}</Text>
            <View style={styles.btnComponent}>
                <TouchableOpacity onPress={()=>this.setState({
                    value: 1
                })}>
                    <View style={{
                        width: width*0.3,
                        height: 36,
                        backgroundColor: this.state.value===1?'#66B9A8':'#fff',
                        borderRadius: 5,
                        justifyContent:'center',
                        alignItems:'center',
                        borderColor: '#66B9A8',
                        borderWidth: 1
                    }}>
                        <Text style={{
                            color: this.state.value===1?'#fff':'#66B9A8',
                            letterSpacing: 1,
                            fontWeight: '700'
                        }}>Описание</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    this.setState({
                        value: 2
                    })
                }}>
                    <View style={{
                        width: width*0.3,
                        height: 36,
                        backgroundColor: this.state.value===2?'#66B9A8':'#fff',
                        borderRadius: 5,
                        borderColor:'#66B9A8',
                        borderWidth: 1,
                        justifyContent:'center',
                        alignItems:'center'
                    }}>
                        <Text style={{
                            letterSpacing: 1,
                            fontWeight: '700',
                            color: this.state.value===2?'#fff':'#66B9A8'
                        }}>Документы</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    this.setState({
                        value: 3
                    })
                }}>
                    <View style={{
                        width: width*0.3,
                        height: 36,
                        backgroundColor: this.state.value===3?'#66B9A8':'#fff',
                        borderRadius: 5,
                        borderColor:'#66B9A8',
                        borderWidth: 1,
                        justifyContent:'center',
                        alignItems:'center'
                    }}>
                        <Text style={{
                            letterSpacing: 1,
                            fontWeight: '700',
                            color: this.state.value===3?'#fff':'#66B9A8'
                        }}>Задание</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <ScrollView >
                {
                    this.state.value === 1
                    ?<this.DesciptionComponent />
                    :this.state.value === 2
                    ?<this.Documents />
                    :<this.Tasks/>
                }
            </ScrollView>
        </View>
      )
    };
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        //justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#fff'
    },
    btnComponent:{
        height: 40,
        width: width*0.95,
        backgroundColor: '#fff',
        borderRadius:5,
        borderWidth:1,
        borderColor:'#66B9A8',
        alignItems:'center',
        paddingHorizontal: 3,
        flexDirection: 'row',
        justifyContent:'space-around'
    },
    desciption:{
        
    },
    documents:{
        
    },
    tasks:{
        
    }
})

export default connect(mapStateToProps) (LessonScreen)