import React from 'react'
import {
    Text,
    View,
    StyleSheet,
    Image,
    ScrollView,
    Dimensions
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';

import { connect } from 'react-redux'
import { fetchCourse, searchCourse } from '../api/course/actions'

const mapStateToProps = state => ({
    items: state.courseReducer.items,
    loading: state.courseReducer.loading,
    error: state.courseReducer.error,
    data: state.courseReducer.data
})

const window = Dimensions.get('window')


class ScreenOpen extends React.Component {
    state = {
        course: {},
        text: 'Курс введения в базы данных знакомит слушателями с историей создания систем обработки структурированных данных, подходами к обработке информации, развитием моделей данных и систем управления данными. Основу курса составляет изучение и применение в типовых ситуациях средств SQL для обработки данных в SQL-СУБД. Выполнение практических задач в рамках курса предполагает использование СУБД MySQL.'
    }
    componentDidMount = async () => {

        this.setState({
            course: this.props.navigation.getParam('param')
        })
        console.log(this.props.navigation.getParam('param'));

    }
    _goTo = (courses,id) => {
        this.props.navigation.navigate('Lesson', { param: {courses:courses, id:id} })
    }
    renderCourse = (courses,id) => {
        const { course } = this.state
        return (
            <View style={styles.lesson}>
                <TouchableOpacity onPress={() => this._goTo(courses,id)}>
                    <Text style={{
                        fontSize: 14,
                        fontWeight: '500',
                        margin: 5,
                        letterSpacing: 2,
                        textTransform: 'capitalize',
                        color: '#459786'
                    }}>{courses.name}</Text>
                </TouchableOpacity>
                <View style={{
                    flexDirection: 'row'
                }}>{
                        course.finished.map((i) => {
                            return i.name === courses.name ? <Image source={require('../img/check.png')} style={{
                                width: 20,
                                height: 20,
                                resizeMode: 'contain',
                                alignSelf: 'center',
                                marginRight: 5
                            }} /> : null
                        })}



                    <Image source={require('../img/btn.png')} style={{
                        width: 20,
                        height: 20,
                        resizeMode: 'contain',
                        alignSelf: 'center'
                    }} />
                </View>


            </View>
        )
    }

    render() {
        const { course } = this.state
        return (
            <ScrollView>
                <View style={styles.container}>
                    <LinearGradient
                        colors={['#66B9A8', '#66B98A']} style={styles.gradient}>
                        <Image source={{ uri: course.img }} style={styles.img} />
                        <View style={styles.nameCourse}>
                            <Text style={styles.nameText}>{course.title}</Text>
                            <Text style={{
                                textAlign: 'right',
                                fontWeight: 'bold',
                                fontSize: 16,
                                top: 5
                            }}>{course.author}</Text>
                        </View>
                        <View style={styles.description}>
                            <TouchableOpacity onPress={() => alert(course.description)}>
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

                        <FlatList
                            data={course.urok}
                            style={{
                                marginBottom: 12
                            }}
                            renderItem={({ item }) => this.renderCourse(item,course.id)}
                            keyExtractor={item => item.id}
                            showsVerticalScrollIndicator={false}
                        />

                    </LinearGradient>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        //justifyContent:'center',
        alignItems: 'center'
    },
    gradient: {
        width: '90%',
        margin: 15,
        alignItems: 'center',
        paddingTop: 12,
        borderRadius: 5
    },
    img: {
        width: '95%',
        height: 270,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#459786'
    },
    nameCourse: {
        height: 75,
        width: '80%',
        backgroundColor: '#fff',
        top: -32,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#459786',
        padding: 8
    },
    nameText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    description: {
        backgroundColor: '#fff',
        width: '80%',
        top: -20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#459786',
        padding: 8,
    },
    lesson: {
        width: window.width * 0.8 * 0.9,
        borderRadius: 5,
        borderColor: '#459786',
        borderWidth: 1,
        backgroundColor: '#fff',
        //top: -12,
        alignItems: 'center',
        height: 30,
        marginTop: 5,
        paddingHorizontal: 8,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

export default connect(mapStateToProps)(ScreenOpen)