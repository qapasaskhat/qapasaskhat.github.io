import React from 'react';
import { Image,View,Text } from 'react-native';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import MainScreen from './screen/MainScreen';
import LoadingScreen from './screen/LoadingScreen';
import LoginScreen from './screen/LoginScreen';
import ProfileScreen from './screen/ProfileScreen';
import CourseScreen from './screen/CourseScreen'
import LoadScreen from './screen/LoadScreen';
import RegisterScreen from './screen/RegisterScreen';
import Screen from './screen/Screen';
import ScreenOpen from './screen/ScreenOpen'
import LessonOpen from './screen/LessonScreen'

import { Provider } from 'react-redux'
import store from './api/store'

const ScreenStack = createStackNavigator({
  MainCourse:{
    screen: MainScreen,
    navigationOptions:{
      headerShown: false
    }
  },
  ScreenCourse:{
    screen: Screen,
    navigationOptions:{
      title:'Курс',
      headerTintColor: '#459786',
      //headerLeft: false,
      headerBackTitle: 'Назад'
    }
  },
  ScreenCourseOpen:{
    screen: ScreenOpen,
    navigationOptions:{
      title:'Курс',
      headerTintColor: '#459786',
      //headerLeft: false,
      headerBackTitle: 'Назад'
    }
  },
  Lesson:{
    screen: LessonOpen,
    navigationOptions:{
      title:'Lesson',
      headerTintColor: '#459786',
      //headerLeft: false,
      headerBackTitle: 'Назад'
    }
  }
})

const Tabs = createBottomTabNavigator({
  Course: {
    screen: CourseScreen,
    navigationOptions:{
      tabBarLabel:'Курсы',
      tabBarIcon:(
        ({tintColor})=>
        <View style={{justifyContent:"center",alignItems:'center'}}>
          <Image source={require('./img/course.png')} style={{width:24,height:24,resizeMode:'contain',tintColor: tintColor}}/>
          <Text style={{color: tintColor, fontSize: 11,fontWeight: '500'}}>Курсы</Text>
        </View>
      ),
      

    }
  },
  Main:{
    screen: ScreenStack,
    navigationOptions:{
      tabBarLabel:'Главная',

      tabBarIcon:(
        ({tintColor})=>
        <View style={{justifyContent:"center",alignItems:'center'}}>
          <Image source={require('./img/main.png')} style={{width:24,height:24,resizeMode:'contain',tintColor: tintColor}}/>
          <Text style={{color: tintColor, fontSize: 11, fontWeight: '500'}}>Главная</Text>
        </View>
)
    }
  },
  Profile:{
    screen: ProfileScreen,
    navigationOptions:{
      tabBarLabel:'Профиль',

      tabBarIcon:(
        ({tintColor})=>
        <View style={{justifyContent:"center",alignItems:'center'}}>
          <Image source={require('./img/profile.png')} style={{width:24,height:24,resizeMode:'contain',tintColor: tintColor}}/>
          <Text style={{color: tintColor, fontSize: 11, fontWeight:'500'}}>Профиль</Text>
        </View>
)
    }
  }
},{
  initialRouteName:'Main',
  tabBarOptions:{
    activeTintColor: "#459786",
    inactiveTintColor: '#B2B2B2',
    showLabel:false
  }
})

const Stack = createStackNavigator({
  Loading:{
    screen: LoadingScreen,
    navigationOptions:{
      //header: null,
      headerShown:false
    }
  },
  Login: {
    screen: LoginScreen,
    navigationOptions:{
      headerTitle: 'Вход',
      headerTintColor: '#459786',
      //headerLeft: false,
      headerBackTitle: 'Назад'
    },
  },
  Register:{
    screen: RegisterScreen
  },
  MainStack:{
    screen: Tabs,
    navigationOptions:{
      headerTitle: 'Главная',
      headerTintColor: '#459786',
      headerLeft: false,
      headerShown: false
    },
  },
  Load:{
    screen: LoadScreen,
    navigationOptions:{
      headerShown: false
    }
  }
},{
  initialRouteName: 'Load'
})

const Container = createAppContainer(Stack)
export default function App() {
  return (
    <Provider store={store}>
      <Container />
    </Provider>
    
  );
}
