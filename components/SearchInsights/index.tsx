import React from 'react'
import TopBar from '../TopBar'
import SearchInsightsOverview from './SearchInsightsOverview'

const SearchInsights = () => {
  return (
    <div className='bg-[#F9FAFB] border-l'>
      <TopBar title="Search Insights" />
      <SearchInsightsOverview />
    </div>
  )
}

export default SearchInsights
