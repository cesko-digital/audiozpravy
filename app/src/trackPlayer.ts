import RNTrackPlayer, { Track, Capability, Event, State } from 'react-native-track-player'

export type PlayerState = {
    currentTrack: Track,
    currentIndex: number,
    recordsCount: number,
    isPlaying: boolean
}

export const initialPlayerState: PlayerState = {
    currentTrack: null,
    currentIndex: null,
    recordsCount: 0,
    isPlaying: false
}

export async function createPlayerState(event: {
    type: Event;
    [key: string]: any;
}) {
    const queue = await RNTrackPlayer.getQueue()
    const currentIndex = await RNTrackPlayer.getCurrentTrack()
    const state = await RNTrackPlayer.getState();
    const track = await RNTrackPlayer.getTrack(currentIndex)

    return {
        currentTrack: track,
        currentIndex: currentIndex,
        recordsCount: queue.length,
        isPlaying: state == State.Playing
    }
}

class TrackPlayer {
    private static instance: TrackPlayer

    static getInstance() {
        if (!TrackPlayer.instance) {
            TrackPlayer.instance = new TrackPlayer()
            TrackPlayer.instance.init()
            return TrackPlayer.instance
        }

        return TrackPlayer.instance
    }

    private init() {
        RNTrackPlayer.setupPlayer({})

        const capabilities = [
            Capability.Play,
            Capability.Pause,
            Capability.SeekTo
        ]
        const options = {
            stopWithApp: false,
            capabilities,
            compactCapabilities: capabilities
        }
        RNTrackPlayer.updateOptions(options)
    }

    public registerService() {
        console.info('TrackPlayer.registerService()')
        RNTrackPlayer.registerPlaybackService(() => require('./services/audio'))
    }

    public async addTrackToQueue(track: Track) {
        const queue = await RNTrackPlayer.getQueue()
        const existingTracks = queue.filter((t) => t.id == track.id)
        if (existingTracks.length > 0) {
            console.warn('Track with id ' + track.id + ' is already in queue.')
            return queue
        }
        track['isPlaying'] = false
        RNTrackPlayer.add([track])
        return RNTrackPlayer.getQueue()
    }

    public async resetPlayer() {
        console.info('TrackPlayer.resetPlayer()')
        await RNTrackPlayer.reset()
    }
}

const playerInstance = TrackPlayer.getInstance()
export default playerInstance
