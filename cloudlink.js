const icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEoAAAAgCAMAAACCYR5/AAAB5lBMVEUAAAAA//8A//8Aqv8Av/8AzP8A1f8A2/8Av/8Axv8AzP8A0f8AxP8AyP8AzP8Az/8Aw/8Axv8Ayf8AzP8Azv8Axf8Ayv8Ayv8AzP8Axf8Ax/8Ay/8AzP8Axv8Ayf8Ay/8Ax/8AyP8Ay/8Ax/8AyP8Ayv8Ay/8AyP8Ayv8Ay/8AyP8Ayf8Ayv8Ayv8Ay/8AyP8AyP8Ayf8Ayv8Ay/8AyP8Ayf8Ayf8AyP8Ayf8AyP8Ayf8Ayf8Ayv8AyP8Ayf8Ayf8AyP8Ayf8AyP8Ayf8Ayf8Ayv8Ayv8AyP8Ayf8Ayv8Ayf8AyP8Ayf8Ayf8Ayf8Ayv8AyP8Ayf8Ayf8Ayv8Ayf8Ayf8Ayv8AyP8Ayf8Ayv8Ayf8Ayf8Ayv8Ayf8Ayv8AyP8Ayf8Ayv8AyP8Ayf8Ayf8Ayv8AyP8Ayf8AyP8Ayf8Ayf8Ayv8Ayf8Ayf8Ayf8AyP8Ayf8Ayf8Ayf8AyP8Ayf8Ayf8Ayf8Ayv8Ayf8Ayf8Ayf8Ayf8AyP8Ayf8Ayv8Ayf8Ayf8Ayf8Ayv8Ayf8Ayf8Ayf8Ayf8Ayf8Ayf8Ayf8Ayf8Ayf8Ayf8Ayf8Ayf8Ayf8Ayf8Ayf8Ayf8Ayf8Ayf8Ayf8Ayf8Ayf8Ayf8Ayf8Ayf8Ayf8Ayf8Ayf8Ayf8Ayf8Ayf////+gPlNjAAAAoHRSTlMAAQIDBAUGBwgJCgsNDg8QERITFBUWGB0eHyAiIyQmJykqLDIzNTY4Ojs8PT9DREVGR0hJSktMT1BYWVpcXV5fYWRmZ2hpamttbnJ0enuAgYOEhYaIiouMjpCSk5SYmZqdnp+gpaeoq62usLGys7W2t7i5u7y9vr/AwcLIycrNz9DR0tPU1drb3+Dh4ubn6Ovs7e7x8vP09fb3+Pn6/P3+cZkg2wAAAAFiS0dEoSnUjjYAAAJISURBVEjHndV3W9NQFAbwUxChVUFwojJcdYAMASkCKrgRV52oiLtVxIEoZbhQAcGtlCItyUc1N7nnJIQkp3j/Osl5+3vuelKAeaOg60e8pxTYkRG62F7imVj7SdXGr42cFOjTYskjHok1uqSqtzkqrMeUY66B1R8MSR3hqDEjpxx26a96LyV1gKO+yaDS4tjOf4uS2sJRUUzOHXLornxD0r0Mjir9TdaBBc3cYZIiS/jLsPMPplPNttaKIZKiWZDG2DVFVtO8xrIBkh6mJQHsNq1GqxQj6Wk2pDnK4mQ1mHe3n6RnKG25FOmsNsq8032DHUV6ubS1O9a5VUYqEvirZAilVyT15sh3bSnx+EAstmRSlIl6ccqv9UM7KUNVM2TVG9JLkp6jVKMYL8IAmR+Ncno9QERegDIZq/2Lv5yt0x6zn5D0wo9Lxr2LB6AWu2EoVPBoMLfXtPYBPCJpJEC7R7sQhHbaRghh+ZmCNdZ5mQueO0iJaXy3HU5h2Q11WI5RcNNXmslVcLTwIKb8EMRuGxTMyvIW5grHSeryiQUvtCrkrpzR6h6jnFgOcFnuYDHOaZKkGz7boZJ1PCke72aKa9UrytHNWpl1R5Q/q2Rog21OLlbxufsd5bLec/5Kg7y6wbPXjuZ7SM77xQ1n6X8sN0mzEouzLNJNn61XPePxYVyUZLVSlZy0bsJ+C9ysYY567C1ZrKTPW/KnGMm0vjCTymMlsi5wC3zHSgCV38V/Tg5Hlevfluve+5C7/8SONK7VtuhorMn27h/zwfO0d8DqPQAAAABJRU5ErkJggg==';
class cloudlink {
  constructor() {}
  getInfo() {
    return {
      id: 'cloudlink',
      name: 'CloudLink',
      color1: '#054c63',
      color2: '#054c63',
      color3: '#043444',
      blockIconURI: icon,
      blocks: [
        {
          opcode: 'get',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Get from websocket [A]',
          arguments: {
            A: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: '127.0.0.1:3000',
            },
          },
        },
      ],
    }
  }
  get({A}) {
    return A;
  }
}
Scratch.extensions.register(new cloudlink())
