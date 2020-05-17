import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    ActivityIndicator
} from 'react-native'
import { TextInput, TouchableOpacity, FlatList } from 'react-native-gesture-handler'
import { LinearGradient } from 'expo-linear-gradient';
import firebase from 'firebase'
import { connect } from 'react-redux'
import { fetchCourse, searchCourse } from '../api/course/actions'

const mapStateToProps = state =>({
    items: state.courseReducer.items,
    loading: state.courseReducer.loading,
    error: state.courseReducer.error,
    data: state.courseReducer.data
})

class MainScreen extends React.Component{
    state={
        searchText: '',
        searchValue: false,
        refreshing: false
    }
    arrayholder = []
    componentDidMount = async()=>{
        this.props.dispatch(fetchCourse())
    }
    goToOpen=(course)=>{
        this.props.navigation.navigate('ScreenCourseOpen',{param:course})
    }
    goToCourse=(course)=>{
        this.props.navigation.navigate('ScreenCourse',{param:course}) 
    }
    goTo=(course)=>{
        console.log(course);
        course.users.map((item)=>{
            item.id === firebase.auth().currentUser.uid? this.goToOpen(course):this.goToCourse(course)
        })
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
                </View>
            </LinearGradient>
        </TouchableOpacity>
        )
    }
    searchFilterFunction = text => {    
        this.setState({
            searchValue: true
        })
        this.props.dispatch(searchCourse(text))
      };

      onRefresh=async()=>{
        this.setState({
            refreshing:true
        })
        await this.props.dispatch(fetchCourse());
        this.setState({
            refreshing:false
        })
    }
    render(){
        const { items,loading,error,data } = this.props
        const { searchText,searchValue } = this.state
        return(
            <ScrollView style={styles.container}>
                <View style={{justifyContent:'center',alignItems:'center',width:'100%',marginVertical:20}}>
                    <Text style={{
                        fontSize:14, 
                        fontWeight: '600',
                        letterSpacing: 5
                    }}>Добро пожаловать!</Text>
                </View>

                <View style={styles.searchView}>
                    <TextInput 
                        autoFocus={false} 
                        placeholder='Поиск...' 
                        style={styles.searchInput} 
                        value={searchText}
                        onChangeText={searchText=>this.setState({searchText})}
                        />
                    <TouchableOpacity style={styles.searchBtn} onPress={()=>this.searchFilterFunction(searchText)}>
                        <Image source={require('../img/search.png')} style={styles.searchIcon}/>                    
                    </TouchableOpacity>
                </View>

                <View style={{
                    justifyContent:'space-between',
                    alignItems:'center',
                    width:'100%',
                    marginVertical:15,
                    paddingHorizontal:20,
                    flexDirection:'row'
                    }}>
                    <Text style={{
                        fontSize:14, 
                        fontWeight: '600',
                        letterSpacing: 2,
                        color:'rgba(0,0,0,0.72)'
                    }}>Популярные курсы</Text>
                    {
                        searchValue?<TouchableOpacity onPress={()=>{
                            this.setState({
                                searchValue: false,
                                searchText: ''
                            })
                        }}>
                            <Text style={{color: 'red'}}>Close</Text>
                        </TouchableOpacity>:
                        null
                    }
                </View>
                {
                    loading?
                    <View style={{
                        marginTop: 128
                    }}>
                        <ActivityIndicator size={'large'} color={'#66B9A8'}/>
                    </View>:
                
                <FlatList style={styles.feed} data={ searchValue?data:items}
                    renderItem = {({item})=>this.renderCourse(item)}
                    keyExtractor = {item=>item.id}
                    showsVerticalScrollIndicator = {false}
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh} 
                 />
    }
            </ScrollView>
        );
    }
}
 const styles = StyleSheet.create({
     container:{
         flex: 1,
         //justifyContent: 'center',
         //alignItems: 'center',
         backgroundColor: '#fff',
         paddingTop: 12
     },
     searchView:{
         flexDirection:'row',
         //width: '100%',
         height: 40,
         marginRight:15,
         marginLeft: 15,
         borderWidth:1,
         borderRadius: 5,
         borderColor:'#66B9A8',
         justifyContent:'space-between',
         alignItems:'center'
     },
     searchBtn:{
         width:36,
         height:36,
         backgroundColor:'#66B9A8',
         borderRadius: 5,
         justifyContent:'center',
         alignItems:'center',
         marginRight:2
     },
     searchIcon:{
         width:24,
         height:24,
         resizeMode: 'contain'
     },
     searchInput:{
         marginLeft: 3,
         maxWidth:'85%',
         fontSize: 14,
         color: '#b2b2b2',
         letterSpacing: 1.5
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
         borderRadius: 5
         //resizeMode:'contain'
     },
     txtView:{
         marginLeft: 10
     },
     textStyle:{
         fontSize:13,
         color: '#fff',
         fontWeight: '600',
         maxWidth: 200
     }
 })
 export default connect(mapStateToProps) (MainScreen)