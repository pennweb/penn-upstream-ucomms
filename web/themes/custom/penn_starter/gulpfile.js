/* eslint-disable */
const pkg = require('./package.json');
const gulp = require('gulp');
const gulpPlugins = require('gulp-load-plugins')();
const nodePath = require('path');

// project
const project = {};
project.assets = 'assets';
project.inc = 'includes';
project.lang = 'languages';
project.node = 'node_modules';
project.components = 'components';
project.dist = nodePath.posix.normalize(`${project.assets}/dist`);
project.fonts = nodePath.posix.normalize(`${project.assets}/fonts`);
project.js = nodePath.posix.normalize(`${project.assets}/js`);
project.scss = nodePath.posix.normalize(`${project.assets}/scss`);
project.vendor = nodePath.posix.normalize(`${project.assets}/vendor`);

const banner = `/*!
 * DO NOT OVERRIDE THIS FILE.
 * Generated with \`npm run build\`
 *
 * ${pkg.name} - ${pkg.description}
 * @version ${pkg.version}
 * @author ${pkg.author.name}
 * @link ${pkg.author.url}
 */

`;

/**
 * Scss compiling
 * @uses gulp-filter, gulp-plumber, gulp-sourcemaps, gulp-sass-globbing, gulp-sass, gulp-autoprefixer, gulp-header, gulp-size
 */

const scss = function (done) {
	const {
		autoprefixer,
		csso,
		filter,
		header,
		plumber,
		rename,
		sass,
		sassGlob,
		size,
	} = gulpPlugins;
	const filterCSS = filter(['**/*.css'], {
		restore: true
	});

	return gulp.src([`${project.scss}/**/*.scss`, `!_*.scss`])
		.pipe(plumber())
		.pipe(sassGlob())
		.pipe(sass({
			includePaths: project.node,
			outputStyle: 'expanded'
		}).on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(header(banner))
		.pipe(size({
			showFiles: true,
			title: 'sass'
		}))
		.pipe(gulp.dest(project.dist))

}

const polyfill = () => {
	const {
		concat,
		header,
		uglify,
		rename
	} = gulpPlugins;

	var files = [
		`${project.js}/polyfill/**/*.js`
	];

	return gulp.src(files, {
		allowEmpty: true
	})
		.pipe(concat('polyfill.js'))
		.pipe(header(banner))
		.pipe(gulp.dest(project.dist))
		.pipe(uglify())
		.pipe(header(banner))
		.pipe(rename({
			extname: '.min.js'
		}))
		.pipe(gulp.dest(project.dist));
}

/**
 * Javascript - Rollup
 *
 * @uses rollup directly instead of a gulp-pipeline
 * @uses rollup-plugin-buble, rollup-plugin-uglify
 */

const js = function (pattern) {

	// edit these
	// nameInModuleImport: windowGlobal
	let globals = {
		jquery: 'jQuery',
	};

	// Note: do not edit these lines
	const del = require('del');
	const rollup = require('rollup');
	const vinylPaths = require('vinyl-paths');
	const es2015 = require('rollup-plugin-buble');
	const commonjs = require('rollup-plugin-commonjs');
	const nodeResolve = require('rollup-plugin-node-resolve');
	const uglify = require('rollup-plugin-uglify').uglify;
	const prettyBytes = require('pretty-bytes');
	const colors = require('ansi-colors');
	const log = require('fancy-log');
	const upperCamelCase = require('uppercamelcase');
	const inflection = require('inflection');

	const getPaths = (path) => {
		const relativePath = nodePath.relative(project.js, path);
		const dir = nodePath.dirname(relativePath);
		const fileName = nodePath.basename(relativePath, '.js');
		const relativeBasename = nodePath.posix.normalize(`${dir.trim('/')}/${fileName}`);
		const dest = nodePath.posix.normalize(`${project.dist}/${relativeBasename}.js`);
		const minDest = nodePath.posix.normalize(`${project.dist}/${relativeBasename}.min.js`);
		const moduleName = relativeBasename.split('/').map((folder) => upperCamelCase(inflection.singularize(folder))).join('');

		return {
			fileName,
			relativeBasename,
			dest,
			minDest,
			moduleName
		};
	};

	const writeFiles = (bundle, path, fileName, moduleName, dest) => {
		const opts = {
			globals,
			file: dest,
			format: 'umd',
			name: moduleName,
			sourcemap: false
		};

		return bundle.generate(opts).then((results) => {
			results.output.forEach((result) => {
				let size = Buffer.byteLength(result.code, 'utf8');
				size = prettyBytes(size);
				log(`${colors.cyan('rollup')} ${colors.blue(fileName)} ${colors.magenta(size)}`);
			});

			return bundle.write(opts);
		});
	};

	// delete dist files
	del.sync([
		`${project.dist}/**/*.js`,
		`${project.dist}/**/*.js.map`,
		`!${project.dist}/**/polyfill.js`,
		`!${project.dist}/**/polyfill.min.js`
	]);

	// read js files
	return gulp.src([
		`${project.js}/**/*.js`,
		`${project.layouts}/**/*.js`,
		`${project.blocks}/**/*.js`,
		`!${project.js}/**/_*.js`
	], {
		read: false
	})
		.pipe(vinylPaths((path) => {
			const {
				fileName,
				relativeBasename,
				dest,
				minDest,
				moduleName
			} = getPaths(path);

			// skip if file has a _ as the first character
			if (fileName[0] === '_') {
				return Promise.resolve();
			}

			return new Promise((resolve, reject) => {
				// compile original file
				return rollup.rollup({
					input: path,
					external: Object.keys(globals),
					onwarn: (warn) => log(`${colors.yellow(relativeBasename + '.js')} ${warn.message}`),
					plugins: [
						nodeResolve(),
						commonjs(),
						es2015(),
					]
				})
					// write original file
					.then((bundle) => writeFiles(bundle, path, relativeBasename + '.js', moduleName, dest))

					// compile minified file
					.then(() => rollup.rollup({
						input: path,
						external: Object.keys(globals),
						onwarn: (warn) => log(`${colors.yellow(relativeBasename + '.min.js')} ${warn.message}`),
						plugins: [
							nodeResolve(),
							commonjs(),
							es2015(),
							uglify()
						]
					}))

					// write minified file
					.then((bundle) => writeFiles(bundle, path, relativeBasename + '.min.js', moduleName, minDest))

					// handle promise
					.then(resolve)
					.catch(reject);
			}).catch((err) => console.log(err));
		}));
}

const vendorCopyFromNpm = function () {
	const {
		size
	} = gulpPlugins;
	const npmFiles = Object.keys(pkg.dependencies).map((name) => `${project.node}/${name}/**/*`);

	return gulp.src(npmFiles, {
		base: project.node
	})
		.pipe(size({
			title: 'vendor'
		}))
		.pipe(gulp.dest(project.vendor));
}

const buildTasks = [scss, js, polyfill];
const vendorTasks = [vendorCopyFromNpm];

// npm install gulp-modernizr --save-dev
let modernizr;
try {
	modernizr = require('gulp-modernizr');
} catch (e) {
	// ignore error
}

if (modernizr) {
	const vendorModernizr = function () {
		const {
			header,
			rename,
			sourcemaps,
			uglify
		} = gulpPlugins;

		return gulp.src([`${project.sass}/**/*.scss`, `${project.js}/**/*.js`])
			.pipe(modernizr({
				options: [
					//'setClasses',
					'addTest',
					'html5printshiv',
					'testProp',
					'fnBind'
				]
			}))
			.pipe(gulp.dest(`${project.dist}`))

			// minified version
			.pipe(sourcemaps.init())
			.pipe(rename({
				suffix: '.min'
			}))
			.pipe(uglify({
				output: {
					comments: true
				}
			}))
			.pipe(header(banner))
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest(nodePath.normalize(`${project.dist}`)));
	};

	gulp.task('build:vendor:modernizr', vendorModernizr);
	vendorTasks.push(vendorModernizr);
}

const watch = function () {
	gulp.watch([`${project.js}/**/*.js`, `!${project.js}/polyfill/**/*.js`, `${project.components}/**/*.js`], js);
	gulp.watch(`${project.js}/**/polyfill/*.js`, polyfill);
	gulp.watch([`${project.scss}/**/*.scss`], scss);
}

const vendor = gulp.parallel(vendorTasks);
const build = gulp.parallel(buildTasks);

gulp.task('build', build);
gulp.task('build:css', scss);
gulp.task('build:js', js);
gulp.task('build:vendor', vendor);
gulp.task('build:polyfill', polyfill);
gulp.task('watch', watch);
gulp.task('default', gulp.series(vendor, build, watch));

// Prettify Twig Output
/**
 * Twig compiling
 * @uses gulp-html-prettifirer
 */
const htmlPrettify = require('gulp-html-prettify');
const twig = function () {

	return gulp
		.src('./**/*.html')
		.pipe(htmlPrettify({ indent_char: " ", indent_size: 4 }))
		.pipe(gulp.dest('./'));

}
gulp.task('clean:twig', twig);