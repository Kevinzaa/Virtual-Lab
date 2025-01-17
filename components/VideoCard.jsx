import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import theme from '../style'
import { icons } from '../constants'
import { ResizeMode, Video } from 'expo-av'

const VideoCard = ({ video: { title, thumbnail, video, prompt, creator: { username, avatar } }, isWeb }) => {

    const [play, setPlay] = useState(false);

    return (
        <View style={[styles.cardContainer, isWeb && styles.webCardContainer]}>
            <View style={styles.headerContainer}>
                <View style={styles.userInfo}>
                    <View style={styles.avatarContainer}>
                        <Image 
                            source={{ uri: avatar }}
                            style={styles.avatar}
                            resizeMode='cover'
                        />
                    </View>

                    <View style={styles.userDetails}>
                        <Text style={[styles.titleText, isWeb && styles.webTitleText]} numberOfLines={1}>
                            {title}
                        </Text>
                        <Text style={[styles.usernameText, isWeb && styles.webUsernameText]} numberOfLines={1}>
                            {username}
                        </Text>
                    </View>
                </View>

                <View style={styles.menuIcon}>
                    <Image
                        style={styles.menuIconImage}
                        source={icons.menu}
                        resizeMode='contain'
                    />
                </View>
            </View>

            {play ? (
                <Video
                    source={{ uri: video }}
                    style={[styles.video, isWeb && styles.webVideo]}
                    resizeMode={ResizeMode.CONTAIN}
                    useNativeControls
                    shouldPlay
                    onPlaybackStatusUpdate={(status) => {
                        if (status.didJustFinish) {
                            setPlay(false);
                        }
                    }}
                />
            ) : (
                <TouchableOpacity
                    style={[styles.thumbnailContainer, isWeb && styles.webThumbnailContainer]}
                    onPress={() => setPlay(true)}
                >
                    <Image
                        source={{ uri: thumbnail }}
                        style={styles.thumbnail}
                        resizeMode='cover'
                    />
                    <Image 
                        source={icons.play}
                        style={styles.playIcon}
                        resizeMode='contain'
                    />
                </TouchableOpacity>
            )}

            <View style={[styles.promptContainer, isWeb && styles.webPromptContainer]}>
                <Text style={[styles.promptText, isWeb && styles.webPromptText]}>
                    {prompt}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 56,
        borderRadius: 16,
        padding: 16,
        backgroundColor: theme.colors.secondary[300],
        width: '100%'
    },
    webCardContainer: {
        width: '80%',
        maxWidth: 800,
        marginHorizontal: 'auto',
    },
    headerContainer: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'flex-start',
        width: '100%',
    },
    userInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarContainer: {
        width: 46,
        height: 46,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.colors.secondary.DEFAULT,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: 6,
    },
    userDetails: {
        flex: 1,
        marginLeft: 12,
        rowGap: 1,
    },
    titleText: {
        color: theme.colors.secondary.DEFAULT,
        fontFamily: 'Poppins-SemiBold',
        fontSize: 14,
    },
    webTitleText: {
        fontSize: 18,
    },
    usernameText: {
        fontSize: 14,
        color: theme.colors.secondary.DEFAULT,
    },
    webUsernameText: {
        fontSize: 16,
    },
    menuIcon: {
        paddingTop: 2,
    },
    menuIconImage: {
        width: 20,
        height: 20,
        marginVertical: 8,
    },
    video: {
        width: '100%',
        height: 240,
        borderRadius: 10,
        marginVertical: 20,
        backgroundColor: theme.colors.black.DEFAULT,
    },
    webVideo: {
        height: 360,
    },
    thumbnailContainer: {
        width: '100%',
        aspectRatio: 16 / 10,
        borderRadius: 10,
        marginTop: 9,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    webThumbnailContainer: {
        // Web-specific styles if needed
    },
    thumbnail: {
        width: '100%',
        height: '100%',
    },
    playIcon: {
        width: 24,
        height: 24,
        position: 'absolute',
    },
    promptContainer: {
        backgroundColor: theme.colors.primary,
        padding: 15,
        borderRadius: 10,
        marginVertical: 20,
        width: '100%',
    },
    webPromptContainer: {
        // Web-specific styles if needed
    },
    promptText: {
        color: theme.colors.secondary.DEFAULT,
        fontFamily: "Poppins-Light",
        fontSize: 16,
    },
    webPromptText: {
        fontSize: 18,
    },
});

export default VideoCard;