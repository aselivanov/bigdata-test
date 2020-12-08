import classNames from 'classnames'
import debounce from 'lodash/debounce'
import { useState, useCallback } from 'react'
import Logo from 'components/Logo'
import GeologyIcon from 'components/icons/Geology'
import DrillIcon from 'components/icons/Drill'
import MiningIcon from 'components/icons/Mining'
import MaintenanceIcon from 'components/icons/Maintenance'
import EconomyIcon from 'components/icons/Economy'
import NotificationsIcon from 'components/icons/Notifications'
import SettingsIcon from 'components/icons/Settings'
import UserIcon from 'components/icons/User'
import HomeIcon from 'components/icons/Home'
import StarIcon from 'components/icons/Star'
import ReportIcon from 'components/icons/Report'
import DashboardIcon from 'components/icons/Dashboard'
import DownloadIcon from 'components/icons/Download'
import SearchIcon from 'components/icons/Search'
import styles from './Home.module.scss'

import ALL_REPORTS from './reports.json'
import { update } from 'lodash'

const CATEGORIES = [
    {
        id: 'drill',
        title: 'Бурение',
        icon: <DrillIcon />
    },
    {
        id: 'dev',
        title: 'Разработка',
        icon: <MiningIcon />
    },
    {
        id: 'mining',
        title: 'Добыча',
        icon: <MiningIcon />
    },
    {
        id: 'maintenance',
        title: 'Обустройство',
        icon: <MaintenanceIcon />
    }
]

export default function Home() {
    let [params, setParams] = useState({
        category: null,
        query: ''
    })

    let reports = ALL_REPORTS.filter(report =>
        report.title.toLocaleLowerCase().includes(params.query.trim().toLocaleLowerCase())
        && (!params.category || params.category === report.type)
    )

    return (
        <div className={styles.layout}>
            <header>
                <Logo className={styles.logo} />

                <ul className={styles.mainMenu}>
                    <li>
                        <a href=""><GeologyIcon /> <span>Геология</span></a>
                    </li>
                    <li>
                        <a href=""><DrillIcon /> <span>Бурение</span></a>
                    </li>
                    <li>
                        <a href=""><MiningIcon /> <span>Разработка и добыча</span></a>
                    </li>
                    <li>
                        <a href=""><MaintenanceIcon /> <span>Обустройство</span></a>
                    </li>
                    <li>
                        <a href=""><EconomyIcon /> <span>Экономика</span></a>
                    </li>
                </ul>

                <ul className={styles.userMenu}>
                    <li>
                        <a href=""><NotificationsIcon /></a>
                    </li>
                    <li>
                        <a href=""><SettingsIcon /></a>
                    </li>
                    <li>
                        <a href=""><UserIcon /></a>
                    </li>
                </ul>
            </header>
            <div className={styles.main}>
                <aside>
                    <ul className={styles.menu}>
                        <li>
                            <a href="">
                                <HomeIcon />
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <StarIcon />
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <ReportIcon />
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <DashboardIcon />
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <DownloadIcon />
                            </a>
                        </li>
                    </ul>
                </aside>
                <div className={classNames('container-fluid', styles.content)}>
                    <div className="row">
                        <div className="col-9">
                            <div className={styles.searchBar}>
                                <div className={classNames(styles.searchInput, 'input-group')}>
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="Поиск"
                                        values={params.query}
                                        onChange={
                                            debounce((e) =>
                                                setParams({ ...params, query: e.target.value })
                                            , 500)
                                        }
                                    />
                                    <div class="input-group-append">
                                        <span class="input-group-text">
                                            <SearchIcon />
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.reports}>
                                <div className={styles.categorySelector}>
                                {CATEGORIES.map(category => (
                                    <div
                                        className={classNames('user-select-none', params.category === category.id && styles.active, styles.category)}
                                        onClick={() => setParams({ ...params, category: category.id === params.category ?  null : category.id })}
                                    >
                                        <div className={styles.icon}>{category.icon}</div>
                                        <div className={classNames('mt-3', styles.title)}>{category.title}</div>
                                    </div>
                                ))}
                                </div>

                                <hr />

                                <div className={classNames('row', styles.items)}>
                                {reports.map(report => (
                                    <div className={classNames('col-4', styles.item)}><a href="">{report.title}</a></div>
                                ))}
                                </div>
                            </div>
                        </div>
                        <div className="col-3">
                            TBD
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}