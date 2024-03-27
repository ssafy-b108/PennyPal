import React, { useTransition } from 'react';

export function TeamInformation() {
    const team = {
        name: '팀명123456',
        head: 5,
        ranking: 20,
        prev: 800000,
        pres: 400000,
        teamInfo: '한줄 설명이에요.',
    };
    return (
        <div className="teamTeamInfo contentCard">
            <div className="teamTeamInfo__title contentCard__title">
                <div className="teamTeamInfo__title-text contentCard__title-text">
                    <div>TEAM INFO</div>
                    <button className="teamTeamInfo__title-text-button button">SETTING</button>
                </div>
            </div>
            <div className="teamTeamInfo__top">
                <div className="teamTeamInfo__top-name">
                    <div className="teamTeamInfo__top-name-title">{team.name}</div>
                    <div className="teamTeamInfo__top-name-head">
                        <img src="assets/image/person.svg" width={20} />
                        <div>{team.head}</div>
                    </div>
                </div>
                <div className="teamTeamInfo__top-ranking">
                    주간 랭킹 {team.ranking}
                    <span className="unit">위</span>
                </div>
            </div>
            <div className="teamTeamInfo__middle">
                <div className="teamTeamInfo__middle-prev">
                    <div className="teamTeamInfo__middle-prev-title subtitle">지난주</div>
                    <div className="teamTeamInfo__middle-prev-value value">
                        {team.prev.toLocaleString()}
                        <span className="unit">원</span>
                    </div>
                </div>
                <div className="teamTeamInfo__middle-pres">
                    <div className="teamTeamInfo__middle-pres-title subtitle">이번주</div>
                    <div className="teamTeamInfo__middle-pres-value value">
                        {team.pres.toLocaleString()}
                        <span className="unit">원</span>
                    </div>
                </div>
                <div className="teamTeamInfo__middle-ratio">
                    <div className="teamTeamInfo__middle-ratio-title subtitle">절감률</div>
                    <div className="teamTeamInfo__middle-ratio-value value">
                        {((team.pres / team.prev) * 100).toFixed(1)}
                        <span className="unit">%</span>
                    </div>
                </div>
            </div>
            <div className="teamTeamInfo__bottom">
                <div className="teamTeamInfo__bottom-desc">{team.teamInfo}</div>
            </div>
        </div>
    );
}
