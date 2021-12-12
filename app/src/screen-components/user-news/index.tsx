import React, { useState } from "react"
import NewsList from "./news-list"
import NewsFilter from "./news-filter"
import ScreenWithMiniplayer from "../screenWithMiniplayer"
import { usePlayer } from "../../trackPlayerContext"

const UserNewsScreen = ({ route, navigation }) => {
  const [selectedCategories, setCategories] = useState([])
  const [selectedTimeRanges, setTimeRanges] = useState([])
  const [expanded, setExpanded] = useState(false)
  const { state } = usePlayer()

  const onFilterChange = (selectedCategories: string[], selectedTimeRanges: number[]) => {
    setCategories(selectedCategories)
    setTimeRanges(selectedTimeRanges)
  }

  return (
    <ScreenWithMiniplayer title='Vlastní výběr zpráv' >

      <NewsFilter initialCategories={selectedCategories} initialTimeRanges={selectedTimeRanges}
        isExpanded={expanded}
        onFilterChange={onFilterChange}
        onExpadedChange={(isExpanded) => { setExpanded(isExpanded) }} />

      <NewsList categories={selectedCategories} style={{ marginBottom: state.recordsCount > 0 ? 88 : 0 }} />

    </ScreenWithMiniplayer>
  )
}


export default UserNewsScreen
