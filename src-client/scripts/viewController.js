import React from 'react'
import {AppRouter} from './router.js'
import {ACTIONS} from './actions.js'
import {STORE} from './store.js'

export const ViewController = React.createClass({

	getInitialState: function(){
		let stateObj = STORE.getStoreData()
		return stateObj
	},

	componentWillMount: function(){
		let vcComponent = this
		STORE.onStoreChange(function(){
			let newStoreState = STORE.getStoreData()
			vcComponent.setState(newStoreState)
		})

		let router = new AppRouter()
	},

	render: function(){
		let currentView = this.state.currentView
		let componentToRender

		switch(currentView){
			case "HOME":
				componentToRender = <h1> The Home Page</h1>
				break;
			case "LOGIN":
				componentToRender =  <h1>Login Form Page</h1>
				break;
			case "UPLOAD":
				componentToRender = <h1>Upload Form Page</h1>
				break;
			case "SERIES":
				componentToRender = <h1>Filtered by Series</h1>
				break;
			case "CLERGY":
				componentToRender = <h1>Filtered by Clergy</h1>
				break;
			case "CAMPUS":
				componentToRender = <h1>Filtered by Campus</h1>
				break;
			default:
				componentToRender = <h1>Nothing found!</h1>
		}

		return (
			<div>
				<Sidebar/>
				{componentToRender}
			</div>
		)

	}
})


// export const ViewController = React.createClass({
//
//    getInitialState: function(){
// 		ACTIONS.changeCurrentNav(this.props.fromRoute, window.location.hash)
// 		let storeObject = STORE.getStoreData()
// 		return storeObject
// 	},
//
//    componentDidMount: function(){
//       let component = this
//       STORE.onStoreChange(function(){
//          let newStoreObj = STORE.getStoreData()
//          component.setState(newStoreObj)
//       })
//
//       ACTIONS.fetchAllSermons()
//    },
//
//       render: function(){
//          let componentToRender
//
//          switch(this.state.currentNavRoute){
// 			case "CAMPUS":
// 				componentToRender = <CampusView {...this.state}/>
// 				break;
// 			case "CLERGY":
// 				componentToRender = <ClergyView {...this.state}/>
// 				break;
//  			case "FORM":
// 				componentToRender = <FormView {...this.state}  />
// 				break;
//             case "HOME":
//    			componentToRender = <HomeView {...this.state} />
//    			break;
//             case "HOME":
//       		componentToRender = <HomeView {...this.state} />
//       		break;
//  			default:
// 		}
//       return(
//          <div>
// 				<HomeView { ...this.state }/>
// 				{componentToRender}
// 			</div>
//       )
//    }
// })