import { ITvShow } from "./ITvShow";

export interface ITvShowsData {
    isFetched: boolean,
    tvShows: ITvShow[],
    currentTvShow: ITvShow,    
}