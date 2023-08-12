import {ChannelModel} from "../src/models/ChannelModel.js";
import {resolvers} from "../src/resolvers/resolver";
import {expect, it,describe} from "@jest/globals";

describe('channels Query', () => {
    it('returns a list of channels', async () => {
        const mockChannels = [
            { channelId: '1', name: 'Channel One' },
            { channelId: '2', name: 'Channel Two' },
        ];

        ChannelModel.find = jest.fn().mockResolvedValue(mockChannels);

        const result = await resolvers.Query.channels();
        expect(result[0].name).toBe("Channel One")
        await expect(result).toEqual(mockChannels);
    });
});