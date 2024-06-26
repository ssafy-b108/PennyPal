import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeTeamDetailModal, registGroup } from '../../model';
import { getTeamDetail } from '../../api/getTeamDetail';
import { USER_ID, getCookie } from '@/shared';
import { getTeamInfo } from '@/pages/teamRouting';
import { setTeamInfo as setTeamInfoState } from '@/pages/teamRouting';
import Swal from 'sweetalert2';

type TeamDetailModalProps = {
    team: any;
};

type TeamInfo = {
    teamName?: string;
    teamInfo?: string;
    teamLeaderNickname?: 'string';
    lastRank?: number;
};

export function TeamApplyModal({ team }: TeamDetailModalProps) {
    const dispatch = useDispatch();
    const [teamInfo, setTeamInfo] = useState<TeamInfo | null>(null);
    const memberId = getCookie('memberId');

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            e.stopPropagation();
            if (e.target instanceof Element) {
                if ([...e.target.classList].some((it) => it === 'modalContainer')) {
                    dispatch(closeTeamDetailModal());
                }
            }
        }
        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('click', handleClick);
        };
    }, []);

    useEffect(() => {
        getTeamDetail(team.teamId)
            .then((res) => {
                if (res.data.code === 200) {
                    setTeamInfo(res.data.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [team.teamId]);

    return (
        <div className="modalContainer">
            <div className="teamDetailModal">
                <div className="teamDetailModal__top">
                    <div className="teamDetailModal__top-title">TEAM INFO</div>
                </div>
                <div className="teamDetailModal__middle">
                    <div className="teamDetailModal__middle-content">
                        {teamInfo ? (
                            <>
                                <div className="teamDetailModal__middle-content-item">
                                    <div className="key">팀명</div>
                                    <div className="value">{teamInfo.teamName}</div>
                                </div>
                                <div className="teamDetailModal__middle-content-item flex">
                                    <div className="key">팀 소개</div>
                                    <div className="value">
                                        {teamInfo.teamInfo ? teamInfo.teamInfo : '팀 소개말이 없습니다.'}
                                    </div>
                                </div>
                                <div className="teamDetailModal__middle-content-item">
                                    <div className="key">팀장</div>
                                    <div className="value">{teamInfo.teamLeaderNickname}</div>
                                </div>
                                <div className="teamDetailModal__middle-content-item">
                                    <div className="key">주간 랭킹</div>
                                    <div className="value">{teamInfo.lastRank}</div>
                                </div>
                            </>
                        ) : null}
                    </div>
                </div>
                <div className="teamDetailModal__bottom">
                    <div className="teamDetailModal__bottom-buttons">
                        <button
                            className="button"
                            onClick={async () => {
                                const res = await registGroup({ teamId: team.teamId, memberId: memberId });

                                switch (res && res.data && res.data.code) {
                                    case 200:
                                        Swal.fire({
                                            title: '팀 가입',
                                            text: '팀에 가입했습니다!\n팀 페이지로 이동합니다.',
                                            icon: 'success',
                                        }).then(() =>
                                            getTeamInfo(`/team/${memberId}`).then((res) => {
                                                if (res.data.code === 200) {
                                                    dispatch(setTeamInfoState(res.data.data));
                                                }
                                            }),
                                        );
                                        break;
                                    case 202:
                                        Swal.fire({
                                            title: '가입 신청',
                                            text: '가입 신청이 완료되었습니다.',
                                            icon: 'success',
                                        });
                                        break;
                                    case 401:
                                        Swal.fire({
                                            title: '가입 실패',
                                            text: '추방당한 팀에는 가입할 수 없습니다.',
                                            icon: 'warning',
                                        });
                                        break;
                                    case 409:
                                        Swal.fire({
                                            title: '가입 실패',
                                            text: '이미 가입 신청한 팀입니다.',
                                            icon: 'info',
                                        });
                                    default:
                                        Swal.fire({
                                            title: 'Error',
                                            text: '예기치 못한 에러가 발생했습니다.\n다시 시도해주세요.',
                                            icon: 'question',
                                        });
                                        break;
                                }
                                dispatch(closeTeamDetailModal());
                            }}
                        >
                            가입 신청
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
