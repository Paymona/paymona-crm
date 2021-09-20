import React from 'react'
import classNames from 'classnames'
import styles from '../scss/molecules/TableTools.module.scss'
import { TableFilter, TableSearch } from '../atoms'
import { Wrap } from '../organisms'

const TableTools = ({
  className='',
  hasFilter=false,
  children='',
  sortList=[],
  filterList=[],
  searchValue='',
  setSortList=()=>{},
  setFilterList=()=>{},
  setSearchValue=()=>{},
  onSearchKeyPress=()=>{},
}) => {
  

  /* Functions */

  const handleSort = text => {
    setSortList(prev => {
      const next = prev.concat()

      next.forEach(col => {
        if (col.text === text)
          col.active = true
        else
          col.active = false
      })

      return next
    })
  }

  const handleSetFilter = text => {
    setFilterList(prev => {
      const next = prev.concat()
      
      next.forEach(filter => {
        filter.list.forEach(tag => {
          if (tag.text === text)
            tag.active = !tag.active
        })
      })

      return next
    })
  }

  return (
    <div className={classNames(className, styles.root)}>
      
      <TableSearch 
        value={searchValue}
        setValue={setSearchValue}
        onKeyPress={onSearchKeyPress}
      />

      <Wrap flex alignCenter justifyEnd>
        {hasFilter && 
          <TableFilter 
            filterList={filterList}
            sortList={sortList}
            onSetFilter={handleSetFilter}
            onSort={handleSort}
          />
        }
        {children}
      </Wrap>

    </div>
  )
}

export default TableTools
