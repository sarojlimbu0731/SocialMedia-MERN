import React from 'react';
import './TrendCard.css';
import {trendData} from '../../data/TrendData'


const TrendCard = () => {
  return (
    <div className="TrendData">
        <h3>Todays' Trends</h3>
        {trendData.map( (Trend)=> {
            return (
                <div className="Trend">
                    <span>#{Trend.name}</span>
                    <span>{Trend.shares}</span>
                </div>
            )
        })}
    </div>
  )
}

export default TrendCard;