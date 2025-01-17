import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'Backbone'
import {SermonModel} from '../models/model-sermon.js'
import {SermonCollection} from '../models/model-sermon.js'
import {ACTIONS} from '../actions.js'

export const uploadFormComponent = React.createClass({
  getInitialState: function(){
    return {

    }
  },

_handleSermonSubmit: function(evt){
  evt.preventDefault();
  let formEl = evt.target
  let formData= {
    name: "The Rev. Chris Warner"
    dateOfSermon: moment().subtract(10, 'days').calendar();
    campus: "Daniel Island"
    series: "Formed In Christ"
  }


)
}
<form className="M-form-group M-grid">
<div className="form-field M-sm-12-of-12 M-md-6-of-12">
    <label>Clergy</label>
    <select>
      <option value="Warner">'The Rev. Chris Warner'</option>
      <option value="Norris">'The Rev. Sean Norris'</option>
      <option value="Spencer">'The Rev. Trevor Spencer'</option>
      <option value="Bennett">'The Rev. Jonathan Bennett'</option>
      <option value="AddNew">'Add New...'</option>
  </select>
</div>

   <div className="form-field M-sm-12-of-12 M-md-6-of-12">
       <label>Sermon Series</label>
       <select>
         <option value="GenHearts">'Generous Hearts'</option>
         <option value="LifeTogether">'Life Together'</option>
         <option value="Formed">'Formed'</option>
         <option value="CrazyBusy">'Crazy Busy'</option>
         <option value="AddNew">'Add New...'</option>
     </select>
   </div>

   <div className="form-field M-sm-12-of-12 M-md-6-of-12">
       <label>Campus</label>
       <select>
         <option value="SI">'Generous Hearts'</option>
         <option value="DI">'Sullivan&#8217;s Island'</option>
         <option value="ION">'I&#8217;On'</option>
     </select>
   </div>

   <div>
      <input type='date'></input>
   </div>

</form>
