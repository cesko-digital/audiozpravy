import React, { useState } from "react"
import NewsList from "../news/news-list"
import useFonts from "../../theme/fonts"
import { useTheme } from '../../theme'
import NewsFilter from "./news-filter"
import ScreenWithMiniplayer from "../screenWithMiniplayer"

const UserNewsScreen = ({ route, navigation }) => {
  const [selectedCategories, setCategories] = useState([])
  const [selectedTimeRanges, setTimeRanges] = useState([])
  const [selectedTypes, setTypes] = useState([])
  const [expanded, setExpanded] = useState(false)

  const onFilterChange = (selectedCategories: number[], selectedTimeRanges: number[], selectedTypes: number[]) => {
    setCategories(selectedCategories)
    setTimeRanges(selectedTimeRanges)
    setTypes(selectedTypes)
    console.log("selectedCategories: " + selectedCategories)
  }

  return (
    <ScreenWithMiniplayer title='Vlastní výběr zpráv' >

      <NewsFilter initialCategories={selectedCategories} initialTimeRanges={selectedTimeRanges} initialTypes={selectedTypes}
        isExpanded={expanded}
        onFilterChange={onFilterChange}
        onExpadedChange={(isExpanded) => { setExpanded(isExpanded) }} />

      <NewsList topic={null} />

    </ScreenWithMiniplayer>
  )
}


export default UserNewsScreen
