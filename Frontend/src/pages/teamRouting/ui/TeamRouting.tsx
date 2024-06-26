import { useCallback, useEffect } from 'react';
import { TeamInfo } from '../../teamInfo/index';
import { Team } from '../../team/index';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/appProvider';
import { getTeamInfo } from '../api/getTeamInfo';
import { getCookie } from '@/shared';
import { useDispatch } from 'react-redux';
import { setTeamInfo } from '../model/setTeamInfo';

interface TeamInfoData {
    teamId?: number;
    teamInfo?: string;
    teamLastEachTotalExpenses?: [];
    teamLastTotalExpenses?: number;
    teamLeaderId?: number;
    teamName?: string;
    teamRankRealtime?: number;
    teamScore?: number;
    teamThisEachTotalExpenses: [];
    teamThisTotalExpenses: number;
}

export function TeamRouting() {
    const dispatch = useDispatch();
    const teamInfo: any = useSelector((state: RootState) => state.setTeamInfoReducer.data);

    const forceRender: boolean = useSelector((state: RootState) => state.forceRenderReducer.data);
    const memberId = getCookie('memberId');
    const fetchData = useCallback((url: string) => getTeamInfo(`/team/${memberId}`), [memberId]);

    // fetchData: 해당 유저 팀 정보 가져오기

    useEffect(() => {
        // REQUEST_URL: 요청 주소
        const REQUEST_URL = `/team/${memberId}`;
        // 1-1. API 요청하기
        fetchData(REQUEST_URL)
            .then((res) => {
                // 1-2. 응답 데이터로 리렌더링
                dispatch(setTeamInfo(res.data.data));
            })
            .catch((err) => console.log(err));
    }, [fetchData, forceRender]);

    return (
        <div className="teamRouting">
            {
                // 1. 로그인 한 상태에서 아직 데이터 받아오기 전
                !teamInfo && (
                    <div className="container" style={{ backgroundColor: 'rgb(64, 64, 64)' }}>
                        로딩중
                    </div>
                )
            }
            {
                // 2. 로그인 후 팀이 있을 때
                teamInfo && teamInfo.teamId && <TeamInfo />
            }
            {
                // 3. 로그인 후 팀이 없을 때
                teamInfo && !teamInfo.teamId && <Team />
            }
        </div>
    );
}
